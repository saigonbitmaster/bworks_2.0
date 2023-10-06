import {
  Injectable,
  Inject,
  forwardRef,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { validateEmail } from '../flatworks/utils/common';
import { Role } from '../flatworks/utils/roles';
import { WalletService } from '../wallet/service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    private walletService: WalletService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //generate token for register user
  async createToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_VERIFY_TOKEN_SECRET,
      expiresIn: process.env.JWT_TOKEN_EXPIRE,
    });
  }

  async logout(userId: string) {
    this.userService.update(userId, { refreshToken: null });
  }

  async login(user: any) {
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user._doc._id, tokens.refreshToken);
    return {
      ...tokens,
      fullName: user._doc.fullName,
      username: user._doc.username,
    };
  }

  async adminLogin(user: any) {
    if (!user._doc.roles.includes(Role.Admin)) return;
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user._doc._id, tokens.refreshToken);
    return {
      ...tokens,
      fullName: user._doc.fullName,
      username: user._doc.username,
    };
  }

  async getTokens(user) {
    const payload = {
      username: user._doc.username,
      sub: user._doc._id,
      roles: user._doc.roles,
      fullName: user._doc.fullName,
    };

    const refreshPayload = {
      sub: user._doc._id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_TOKEN_SECRET,
        expiresIn: process.env.JWT_TOKEN_EXPIRE,
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_RENEW_TOKEN_EXPIRE,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const saltOrRounds = 10;
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async register(registerUser: any): Promise<any> {
    //{username: abc, email: abc@gmail.com, password: ***, fullName: abc, walletAddress: abc}

    const _usernames = await this.userService.findAllRaw({
      username: registerUser.username,
    });

    const _emails = await this.userService.findAllRaw({
      email: registerUser.email,
    });

    const errorMessage = !validateEmail(registerUser.email)
      ? 'Not a valid email address'
      : _usernames?.length > 0
      ? 'Username is already existed'
      : _emails?.length > 0
      ? 'Email is already existed'
      : null;

    if (errorMessage) {
      throw new BadRequestException({
        cause: new Error(),
        description: 'Submit error',
        message: errorMessage,
      });
    }
    const payload = {
      fullName: registerUser.fullName,
      username: registerUser.username,
      email: registerUser.email,
      password: registerUser.password,
      walletAddress: registerUser.walletAddress,
    };

    const emailToken = await this.createToken(payload);
    console.log(emailToken);
    return this.mailService.send(registerUser, emailToken);
  }

  async verify(user: any): Promise<any> {
    const insertedUser = (await this.userService.create({
      ...user,
      roles: [Role.User],
    })) as any;
    const { id: userId, username } = insertedUser;
    const { walletAddress } = user;
    const _wallet = await this.walletService.create(
      {
        username,
        address: walletAddress,
      },
      userId,
    );

    return insertedUser;
  }
}

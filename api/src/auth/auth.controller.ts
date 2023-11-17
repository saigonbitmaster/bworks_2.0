import {
  Post,
  UseGuards,
  Request,
  Controller,
  Get,
  Response,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RefreshTokenGuard } from './refresh-auth.guard';
import { RegisterAuthGuard } from './register-auth.guard';
import { ResetPasswordAuthGuard } from './reset-password-auth.guard';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { ResetPasswordUserDto } from '../user/dto/reset-password-user.dto';
import { ChangePasswordDto } from '../user/dto/change-password.dto';
import { Public } from '../flatworks/roles/public.api.decorator';
import { EventAuthGuard } from './events-auth.guard';
import { HomePageAuthGuard } from './home-page-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //cms login
  @UseGuards(LocalAuthGuard)
  @Post('adminlogin')
  @Public()
  async adminLogin(@Request() req) {
    return this.authService.adminLogin(req.user);
  }

  @UseGuards(HomePageAuthGuard)
  @Get('profile')
  @Public()
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @Public()
  refreshTokens(@Request() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('logout')
  logout(@Request() req) {
    this.authService.logout(req.user['userId']);
  }

  @Post('register')
  @Public()
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.authService.register(registerUser);
  }

  @UseGuards(RegisterAuthGuard)
  @Get('verify')
  @Public()
  async verify(@Request() req, @Response() res) {
    try {
      await this.authService.verify(req.user);
    } catch (error) {
      res.redirect('/api/verifyFailed.html');
      return;
    }
    res.redirect('/api/verifySucceed.html');
    return;
  }

  @Post('forgotpwd')
  @Public()
  async requestResetPassword(
    @Body() resetPasswordUserDto: ResetPasswordUserDto,
  ) {
    return await this.authService.requestResetPassword(resetPasswordUserDto);
  }

  @UseGuards(ResetPasswordAuthGuard)
  @Post('resetpwd')
  @Public()
  async resetPassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req,
  ) {
    const userId = req.user['userId'];
    return await this.authService.resetPassword(changePasswordDto, userId);
  }
}

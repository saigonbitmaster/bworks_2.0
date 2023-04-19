import {
  Post,
  UseGuards,
  Request,
  Controller,
  Get,
  Response,
  ForbiddenException,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenGuard } from './refresh-auth.guard';
import { UserService } from '../user/user.service';
import { RegisterAuthGuard } from './register-auth.guard';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import { ApiBearerAuth, ApiBasicAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Request() req) {
    this.authService.logout(req.user['sub']);
  }

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.authService.register(registerUser);
  }

  @UseGuards(RegisterAuthGuard)
  @Get('verify')
  async verify(@Request() req, @Response() res) {
    try {
      await this.authService.verify(req.user);
    } catch (error) {
      res.redirect('/verifyFailed.html');
      return;
    }
    res.redirect('/verifySucceed.html');
    return;
  }
}

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
import { Public } from '../flatworks/roles/public.api.decorator';
import { RolesGuard } from '../flatworks/roles/roles.guard';

import { Roles } from '../flatworks/roles/roles.decorator';
import { Role } from '../flatworks/types/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('profile')
  @Public()
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('profile1')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  getProfile1(@Request() req) {
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
      res.redirect('/verifyFailed.html');
      return;
    }
    res.redirect('/verifySucceed.html');
    return;
  }
}

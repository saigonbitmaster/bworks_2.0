import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, 'register') {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
      secretOrKey: process.env.JWT_VERIFY_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      email: payload.email,
      username: payload.username,
      password: payload.password,
      fullName: payload.fullName,
      walletAddress: payload.walletAddress,
    };
  }
}

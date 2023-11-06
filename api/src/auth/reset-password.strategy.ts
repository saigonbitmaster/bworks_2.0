import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ResetPasswordStrategy extends PassportStrategy(
  Strategy,
  'resetPassword',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
      secretOrKey: process.env.JWT_RESET_PASSWORD_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}

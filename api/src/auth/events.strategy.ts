import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/*
To serve event source request with url query param: https://..?acccess_token='access_token'
*/
@Injectable()
export class EventStrategy extends PassportStrategy(Strategy, 'events') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      fullName: payload.fullName,
      roles: payload.roles,
    };
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/*
This is not authentication token, this just to secure the APIs for external access e.g send message from homePage.
The token is generated from homepage 
*/
@Injectable()
export class HomePageStrategy extends PassportStrategy(Strategy, 'homePage') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_HOME_PAGE_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      key: payload.key,
    };
  }
}

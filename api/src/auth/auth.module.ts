import { Module, Global, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/module';
import { MailModule } from '../mail/mail.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { RegisterStrategy } from './register.strategy';
import { RefreshTokenStrategy } from './refresh.strategy';
import { ResetPasswordStrategy } from './reset-password.strategy';
import { EventStrategy } from './events.strategy';
import { HomePageStrategy } from './home-page.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({}),
    MailModule,
    WalletModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RegisterStrategy,
    RefreshTokenStrategy,
    EventStrategy,
    ResetPasswordStrategy,
    HomePageStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

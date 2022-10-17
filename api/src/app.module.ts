import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostJobModule } from './PostJob/module';
import { ConfigModule } from '@nestjs/config';
import { SkillModule } from './skill/module';
import { CurrencyModule } from './currency/module';
import { JobBidModule } from './jobbid/module';
import { ToolModule } from './tool/module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:123456@localhost:27017/bworks2?authSource=admin&readPreference=primary',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    PostJobModule,
    SkillModule,
    CurrencyModule,
    JobBidModule,
    ToolModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostJobModule } from './postjob/module';
import { ConfigModule } from '@nestjs/config';
import { SkillModule } from './skill/module';
import { CurrencyModule } from './currency/module';
import { JobBidModule } from './jobbid/module';
import { ToolModule } from './tool/module';
import { WalletModule } from './wallet/module';
import { ContractModule } from './contract/module';
import { PlutusTxModule } from './plutustx/module';
import { QueueModule } from './queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { JobTaskModule } from './jobtask/module';
import { AdminWalletModule } from './adminwallet/module';
import { PublicModule } from './customapi/module';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './flatworks/roles/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { EventModule } from './events/module';
import { SettingModule } from './setting/module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.CONNECTION_STRING,
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
      limiter: {
        max: 50,
        duration: 1000,
      },
    }),
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
    WalletModule,
    QueueModule,
    ContractModule,
    PlutusTxModule,
    JobTaskModule,
    AdminWalletModule,
    PublicModule,
    MailModule,
    EventModule,
    SettingModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

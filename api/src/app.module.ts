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
import { QueueModule } from './queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { JobTaskModule } from './jobtask/module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:123456@localhost:27017/bworks2?authSource=admin&readPreference=primary',
    ),
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
    JobTaskModule,
  ],
})
export class AppModule {}

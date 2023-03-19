import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { WalletService } from './service';
import { WalletController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [WalletService, JwtService],
  controllers: [WalletController],
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    UserModule,
  ],
  exports: [WalletService],
})
export class WalletModule {}

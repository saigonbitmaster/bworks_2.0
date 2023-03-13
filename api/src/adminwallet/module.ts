import { Module } from '@nestjs/common';
import { AdminWalletService } from './service';
import { AdminWalletController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminWallet, AdminWalletSchema } from './schemas/schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AdminWalletService, JwtService],
  controllers: [AdminWalletController],
  imports: [
    MongooseModule.forFeature([
      { name: AdminWallet.name, schema: AdminWalletSchema },
    ]),
  ],
})
export class AdminWalletModule {}

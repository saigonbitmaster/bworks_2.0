import { Module } from '@nestjs/common';
import { CurrencyService } from './service';
import { CurrencyController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './schemas/schema';

@Module({
  providers: [CurrencyService],
  controllers: [CurrencyController],
  imports: [
    MongooseModule.forFeature([{ name: Currency.name, schema: CurrencySchema }]),
  ],
})
export class CurrencyModule {}

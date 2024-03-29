import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueProcessor } from './queue.processor';
import { JobBidModule } from '../jobbid/module';
import { WalletModule } from '../wallet/module';
import { PlutusTxModule } from '../plutustx/module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue',
      limiter: {
        max: 10,
        duration: 1000,
      },
    }),
    JobBidModule,
    WalletModule,
    PlutusTxModule,
  ],
  controllers: [QueueController],
  providers: [QueueProcessor],
})
export class QueueModule {}

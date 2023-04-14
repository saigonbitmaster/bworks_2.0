import { Module } from '@nestjs/common';
import { PublicService } from './service';
import { PublicController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TokenReceiver,
  TokenReceiverSchema,
} from './schemas/token-receiver.schema';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';

//apis for homepage & other public requests
@Module({
  providers: [PublicService],
  controllers: [PublicController],
  imports: [
    MongooseModule.forFeature([
      { name: TokenReceiver.name, schema: TokenReceiverSchema },
    ]),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
  exports: [PublicService],
})
export class PublicModule {}

import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PublicController } from './public.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillModule } from '../skill/module';

import {
  TokenReceiver,
  TokenReceiverSchema,
} from './schemas/token-receiver.schema';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { PostJobModule } from '../postjob/module';
import { JobBidModule } from '../jobbid/module';

//apis for homepage & other public requests
@Module({
  providers: [PublicService, SearchService],
  controllers: [PublicController, SearchController],
  imports: [
    MongooseModule.forFeature([
      { name: TokenReceiver.name, schema: TokenReceiverSchema },
      { name: Campaign.name, schema: CampaignSchema },
    ]),
    JobBidModule,
    PostJobModule,
    SkillModule,
  ],
  exports: [PublicService, SearchService],
})
export class PublicModule {}

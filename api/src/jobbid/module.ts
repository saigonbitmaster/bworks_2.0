import { Module } from '@nestjs/common';
import { JobBidService } from './service';
import { JobBidController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobBid, JobBidSchema } from './schemas/schema';

import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../user/schemas/user.schema';
import { PostJob, PostJobSchema } from '../postjob/schemas/schema';

@Module({
  providers: [JobBidService, JwtService],
  controllers: [JobBidController],
  imports: [
    MongooseModule.forFeature([{ name: JobBid.name, schema: JobBidSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: PostJob.name, schema: PostJobSchema }]),
  ],
})
export class JobBidModule {}

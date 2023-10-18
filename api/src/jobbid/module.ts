import { Module, Global } from '@nestjs/common';
import { JobBidService } from './service';
import { JobBidController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobBid, JobBidSchema } from './schemas/schema';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../user/schemas/user.schema';
import { PostJob, PostJobSchema } from '../postjob/schemas/schema';
import { UserModule } from '../user/user.module';
import { PostJobModule } from '../postJob/module';
import { JobBidControllerCms } from './controller.cms';
import { MailModule } from '../mail/mail.module';

@Global()
@Module({
  providers: [JobBidService, JwtService],
  controllers: [JobBidController, JobBidControllerCms],
  imports: [
    MongooseModule.forFeature([{ name: JobBid.name, schema: JobBidSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: PostJob.name, schema: PostJobSchema }]),
    UserModule,
    PostJobModule,
    MailModule,
  ],
  exports: [JobBidService],
})
export class JobBidModule {}

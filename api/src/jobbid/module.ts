import { Module, Global, forwardRef } from '@nestjs/common';
import { JobBidService } from './service';
import { JobBidController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobBid, JobBidSchema } from './schemas/schema';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../user/schemas/user.schema';
import { PostJob, PostJobSchema } from '../postjob/schemas/schema';
import { UserModule } from '../user/user.module';
import { PostJobModule } from '../postjob/module';
import { JobBidControllerCms } from './controller.cms';
import { MailModule } from '../mail/mail.module';
import { EventModule } from '../events/module';

@Global()
@Module({
  providers: [JobBidService, JwtService],
  controllers: [JobBidController, JobBidControllerCms],
  imports: [
    MongooseModule.forFeature([{ name: JobBid.name, schema: JobBidSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: PostJob.name, schema: PostJobSchema }]),
    UserModule,
    forwardRef(() => PostJobModule),
    MailModule,
    EventModule,
  ],
  exports: [JobBidService],
})
export class JobBidModule {}

import { Module, forwardRef } from '@nestjs/common';
import { PostJobService } from './service';
import { PostJobController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostJob, PostJobSchema } from './schemas/schema';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserModule } from '../user/user.module';
import { SkillModule } from '../skill/module';
import { JobBidModule } from '../jobbid/module';

@Module({
  providers: [PostJobService, JwtService],
  controllers: [PostJobController],
  imports: [
    MongooseModule.forFeature([{ name: PostJob.name, schema: PostJobSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    SkillModule,
    forwardRef(() => JobBidModule),
  ],
  exports: [PostJobService],
})
export class PostJobModule {}

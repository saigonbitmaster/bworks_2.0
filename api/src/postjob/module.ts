import { Module } from '@nestjs/common';
import { PostJobService } from './service';
import { PostJobController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostJob, PostJobSchema } from './schemas/schema';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  providers: [PostJobService, JwtService],
  controllers: [PostJobController],
  imports: [
    MongooseModule.forFeature([{ name: PostJob.name, schema: PostJobSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [PostJobService],
})
export class PostJobModule {}

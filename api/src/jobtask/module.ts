import { Module } from '@nestjs/common';
import { JobTaskService } from './service';
import { JobTaskController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobTask, JobTaskSchema } from './schemas/schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JobTaskService, JwtService],
  controllers: [JobTaskController],
  imports: [
    MongooseModule.forFeature([{ name: JobTask.name, schema: JobTaskSchema }]),
  ],
})
export class JobTaskModule {}

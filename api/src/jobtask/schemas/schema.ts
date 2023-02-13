import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type JobTaskDocument = JobTask & Document;

@Schema()
export class JobTask {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  creator: string;

  @Prop()
  updater: string;

  @Prop()
  startDate: Date;

  @Prop()
  deadline: Date;

  @Prop()
  completedPercentage: number;

  @Prop()
  completeDate: Date;

  @Prop()
  gitLink: string;

  @Prop()
  description: string;

  @Prop()
  completedAt: Date;

  @Prop()
  createdAt: Date;
}

const JobTaskSchema = SchemaFactory.createForClass(JobTask);
JobTaskSchema.plugin(uniqueValidator);
JobTaskSchema.index({ name: 'text' });

export { JobTaskSchema };

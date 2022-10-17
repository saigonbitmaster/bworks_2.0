import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type JobBidDocument = JobBid & Document;

@Schema()
export class JobBid {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  jobId: string;

  @Prop({ required: true })
  jobSeekerId: string;

  @Prop({ required: true })
  employerId: string;

  @Prop({ required: true })
  bidDate: Date;

  @Prop({ required: true })
  completeDate: Date;

  @Prop({ required: true })
  bidValue: number;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const JobBidSchema = SchemaFactory.createForClass(JobBid);
JobBidSchema.plugin(uniqueValidator);

export { JobBidSchema };

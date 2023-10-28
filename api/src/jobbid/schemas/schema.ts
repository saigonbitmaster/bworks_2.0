import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Message } from '../../flatworks/types/types';

export type JobBidDocument = JobBid & Document;

@Schema()
export class JobBid {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
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

  @Prop({ default: false })
  hasPrototype: boolean;

  @Prop()
  prototypeLink: string;

  @Prop({ default: false })
  isSelected: boolean;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop({ default: false })
  isSignedTx: boolean;

  @Prop()
  plutusTxId: string;

  @Prop({ default: true })
  isApproved: boolean;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: false })
  jobDone: boolean;

  @Prop()
  rate?: number;

  @Prop()
  messages?: Message[];

  @Prop()
  extraText: string;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const JobBidSchema = SchemaFactory.createForClass(JobBid);
JobBidSchema.plugin(uniqueValidator);
JobBidSchema.index(
  {
    name: 'text',
    description: 'text',
  },
  {
    weights: {
      name: 1,
      description: 1,
    },
    name: 'textIndex',
  },
);

JobBidSchema.index(
  {
    employerId: 1,
  },
  {
    name: 'employerId',
  },
);
JobBidSchema.index(
  {
    jobSeekerId: 1,
  },
  {
    name: 'jobSeekerId',
  },
);
export { JobBidSchema };

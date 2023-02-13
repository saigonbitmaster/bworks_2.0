import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type PostJobDocument = PostJob & Document;

@Schema()
export class PostJob {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  employerId: string;

  @Prop({ required: true })
  expireDate: Date;

  @Prop({ required: true })
  expectDate: string;

  @Prop({ required: true })
  budget: number;

  @Prop({ required: true })
  currencyId: string;

  @Prop()
  minBidValue: number;

  @Prop()
  requiredAmountToBid: number;

  @Prop()
  skills: string[];

  @Prop()
  tasks: string[];

  @Prop()
  isApproved: boolean;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  createdDate?: Date;
}

const PostJobSchema = SchemaFactory.createForClass(PostJob);
PostJobSchema.plugin(uniqueValidator);
PostJobSchema.index({ name: 'text' });

export { PostJobSchema };

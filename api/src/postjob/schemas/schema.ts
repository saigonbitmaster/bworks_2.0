import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type PostJobDocument = PostJob & Document;
/*extra text to add extra text for fullText search*/
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

  @Prop({ default: 0 })
  minBidValue: number;

  @Prop()
  requiredAmountToBid: number;

  @Prop()
  skills: string[];

  @Prop()
  tasks: string[];

  @Prop({ default: true })
  isApproved: boolean;

  @Prop()
  extraText: string;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const PostJobSchema = SchemaFactory.createForClass(PostJob);
PostJobSchema.plugin(uniqueValidator);
//create multi index to trick the search $or
PostJobSchema.index(
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
PostJobSchema.index(
  {
    employerId: 1,
  },
  { name: 'employerId' },
);

PostJobSchema.index(
  {
    skills: 1,
  },
  { name: 'skills' },
);

export { PostJobSchema };

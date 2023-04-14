import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema()
export class Campaign {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop()
  description: string;
  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const CampaignSchema = SchemaFactory.createForClass(Campaign);
CampaignSchema.index({ name: 'text' });

export { CampaignSchema };

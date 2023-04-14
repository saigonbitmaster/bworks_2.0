import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenReceiverDocument = TokenReceiver & Document;

@Schema({
  autoIndex: true,
})
export class TokenReceiver {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  campaignId!: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const TokenReceiverSchema = SchemaFactory.createForClass(TokenReceiver);
TokenReceiverSchema.index({ email: 1, campaignId: 1 }, { unique: true });
TokenReceiverSchema.index({ name: 'text' });

export { TokenReceiverSchema };

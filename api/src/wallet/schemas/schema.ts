import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true, unique: true })
  userId: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const WalletSchema = SchemaFactory.createForClass(Wallet);
WalletSchema.plugin(uniqueValidator);

export { WalletSchema };

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type AdminWalletDocument = AdminWallet & Document;

@Schema()
export class AdminWallet {
  @Prop({ required: true, unique: true })
  address: string;

  @Prop()
  isMainnet?: boolean;

  @Prop()
  pKeyHash?: string;

  @Prop()
  pKeyHashBech32?: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const AdminWalletSchema = SchemaFactory.createForClass(AdminWallet);
AdminWalletSchema.plugin(uniqueValidator);

export { AdminWalletSchema };

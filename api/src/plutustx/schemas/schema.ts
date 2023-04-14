import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type PlutusTxDocument = PlutusTx & Document;

@Schema()
export class PlutusTx {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  jobBidId: string;

  @Prop({ required: true })
  assetName: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  lockedTxHash: string;

  @Prop()
  isUnlocked: boolean;

  @Prop()
  unlockedTxHash: string;

  @Prop()
  lockDate: Date;

  @Prop()
  unlockDate: Date;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const PlutusTxSchema = SchemaFactory.createForClass(PlutusTx);
PlutusTxSchema.plugin(uniqueValidator);

export { PlutusTxSchema };
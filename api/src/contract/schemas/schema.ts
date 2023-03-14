import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type ContractDocument = Contract & Document;

@Schema()
export class Contract {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ required: true, unique: true })
  cborhex: string;

  @Prop()
  version: string;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const ContractSchema = SchemaFactory.createForClass(Contract);
ContractSchema.plugin(uniqueValidator);

export { ContractSchema };

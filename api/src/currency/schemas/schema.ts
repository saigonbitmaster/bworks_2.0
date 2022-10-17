import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type CurrencyDocument = Currency & Document;

@Schema()
export class Currency {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const CurrencySchema = SchemaFactory.createForClass(Currency);
CurrencySchema.plugin(uniqueValidator);

export { CurrencySchema };

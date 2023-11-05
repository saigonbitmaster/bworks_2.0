import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type SettingDocument = Setting & Document;

@Schema()
export class Setting {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  value: string;

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const SettingSchema = SchemaFactory.createForClass(Setting);
SettingSchema.plugin(uniqueValidator);
SettingSchema.index(
  {
    name: 'text',
    key: 'text',
  },
  {
    weights: {
      name: 1,
      key: 1,
    },
    name: 'textIndex',
  },
);

export { SettingSchema };

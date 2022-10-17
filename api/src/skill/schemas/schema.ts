import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const SkillSchema = SchemaFactory.createForClass(Skill);
SkillSchema.plugin(uniqueValidator);

export { SkillSchema };

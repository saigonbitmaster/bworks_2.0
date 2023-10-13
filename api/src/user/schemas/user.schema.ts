import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../flatworks/utils/roles';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  contact: string;

  @Prop({ default: false })
  isShowContact: boolean;

  @Prop({ required: true })
  password: string;

  @Prop()
  userId: string;

  @Prop()
  fullName: string;

  @Prop()
  refreshToken: string;

  @Prop()
  roles: Role[];

  @Prop()
  skills: any[];

  @Prop()
  description: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt?: Date;

  @Prop()
  deletedAt?: Date;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({
  username: 'text',
  fullName: 'text',
  email: 'text',
  description: 'text',
});

export { UserSchema };

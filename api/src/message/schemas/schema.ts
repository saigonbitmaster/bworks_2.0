import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  messageType: string;

  @Prop()
  completedAt?: Date;

  @Prop()
  createdAt?: Date;
}

const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.index(
  {
    email: 'text',
    message: 'text',
  },
  {
    weights: {
      name: 1,
      description: 1,
    },
    name: 'textIndex',
  },
);

export { MessageSchema };

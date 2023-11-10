import { Module } from '@nestjs/common';
import { MessageService } from './service';
import { MessageController } from './controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/schema';

/* store message send from home page */
@Module({
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
})
export class MessageModule {}

import { Module } from '@nestjs/common';
import { EventController } from './controller';
import { EventsService } from './service';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventModule {}

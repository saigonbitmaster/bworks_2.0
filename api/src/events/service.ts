import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Event, EventType } from '../flatworks/types/types';
import { esWriteData, esWriteHeader } from '../flatworks/utils/event.source';

@Injectable()
export class EventsService {
  users: Map<string, any>;
  data: Map<string, any>;

  constructor() {
    this.users = new Map();
    this.data = new Map();
  }

  /*
  server sent event services to notify users on: new message, job bid change, payment actions.
  - create user server event source connections
  - write, remove user events to user connections
  - close  user connections
  */

  addUser(userId: string, res: Response) {
    this.users.set(userId, esWriteHeader(res));
    const userData = this.data.get(userId) || [];
    return esWriteData(res, 'notification', userData);
  }

  addEvent(userId: string, type: EventType, event: Event) {
    if (!userId || !event.message) return;
    const res = this.users.get(userId);
    const userData = [
      {
        ...event,
        id: uuidv4(),
        date: new Date(),
      },
      ...(this.data.get(userId) || []),
    ];
    this.data.set(userId, userData);
    return esWriteData(res, 'notification', userData);
  }

  deleteEvent(userId, eventId) {
    if (!userId || !eventId) return;
    const userData = (this.data.get(userId) || []).filter(
      (item) => item.id !== eventId,
    );
    this.data.set(userId, userData);
    const res = this.users.get(userId);
    return esWriteData(res, 'notification', userData);
  }

  removeUser(userId: string) {
    if (!userId) return;
    this.users.delete(userId);
  }
}

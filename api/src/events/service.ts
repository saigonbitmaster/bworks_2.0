import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Event } from '../flatworks/types/types';

type EventType = 'notification' | 'data' | 'progress';

@Injectable()
export class EventsService {
  users: Map<string, any>;
  data: Map<string, any>;

  constructor() {
    this.users = new Map();
    this.data = new Map(); //{id: uuid, useId: abc, message: jobBidId || plutusTxId, userType: employer || jobSeeker}
  }

  addUser(userId: string, res: Response) {
    this.users.set(userId, res);
    //  this.data.set(userId, []);
    console.log(`events: User ${userId} is connected`);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*',
    });

    //return current events data at first time user connect
    const _userData = this.data.get(userId) || [];
    const userData = JSON.stringify(_userData);

    return res.write(`event: notification\ndata: ${userData} \n\n`);
  }

  sendMessage(userId: string, type: EventType, event: Event) {
    if (!userId || !event.message) return;
    const res = this.users.get(userId);
    const _userData = this.data.get(userId) || [];
    this.data.set(userId, [
      ..._userData,
      {
        ...event,
        id: uuidv4(),
        date: new Date(),
      },
    ]);

    const userData = JSON.stringify(this.data.get(userId));
    if (res) {
      res.write(`event: ${type}\ndata: ${userData} \n\n`);
    }
  }

  removeUser(userId: string) {
    this.users.delete(userId);
    console.log(`events User ${userId} is disconnected`);
  }

  removeEvent(userId, id) {
    const _userData = this.data.get(userId) || [];
    const userData = _userData.filter((item) => item.id !== id);
    this.data.set(userId, userData);

    const res = this.users.get(userId);
    //update new data to browser
    if (res) {
      return res.write(
        `event: notification\ndata: ${JSON.stringify(userData)} \n\n`,
      );
    }
  }
}

import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Post,
  Param,
} from '@nestjs/common';
import { EventsService } from './service';
import { Request, Response } from 'express';
import * as lodash from 'lodash';
import { Public } from '../flatworks/roles/public.api.decorator';
import { EventAuthGuard } from '../auth/events-auth.guard';
import { v4 as uuidv4 } from 'uuid';

@Controller('events')
export class EventController {
  constructor(private readonly services: EventsService) {}

  @UseGuards(EventAuthGuard)
  @Get('jobbids')
  @Public()
  submitEvents(@Req() req: Request, @Res() res: Response) {
    const userId = lodash.get(req, 'user.userId', null);
    console.log(userId);
    // remove userId from the list when they send close event or close browser
    req.on('close', () => this.services.removeUser(userId));
    // Add a userId to the list of connected userIds and establish the SSE connection
    return this.services.addUser(userId, res);
  }

  @UseGuards(EventAuthGuard)
  @Get('messages')
  @Public()
  getMessage(@Req() req: Request) {
    const userId = lodash.get(req, 'user.userId', null);
    const event = {
      type: 'job',
      userType: 'employer',
      message: '652fdaf6a2ff4ba0d0d7522f',
    };
    return this.services.sendMessage(userId, 'notification', event);
  }

  @Get('remove/:id')
  removeEvent(@Req() req: Request, @Param('id') id: string) {
    const userId = lodash.get(req, 'user.userId', null);
    return this.services.removeEvent(userId, id);
  }
}

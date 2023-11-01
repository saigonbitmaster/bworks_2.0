import { Controller, Get, Req, Res, UseGuards, Param } from '@nestjs/common';
import { EventsService } from './service';
import { Request, Response } from 'express';
import * as lodash from 'lodash';
import { Public } from '../flatworks/roles/public.api.decorator';
import { EventAuthGuard } from '../auth/events-auth.guard';

@Controller('events')
export class EventController {
  constructor(private readonly services: EventsService) {}

  @UseGuards(EventAuthGuard)
  @Get('submit')
  @Public()
  submitEvents(@Req() req: Request, @Res() res: Response) {
    const userId = lodash.get(req, 'user.userId', null);
    req.on('close', () => this.services.removeUser(userId));
    return this.services.addUser(userId, res);
  }

  @Get('delete/:id')
  deleteEvent(@Req() req: Request, @Param('id') id: string) {
    const userId = lodash.get(req, 'user.userId', null);
    return this.services.deleteEvent(userId, id);
  }
}

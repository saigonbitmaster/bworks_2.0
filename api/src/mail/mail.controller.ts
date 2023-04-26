import { Controller, Response, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async index(): Promise<any> {
    return await this.mailService.send(
      {
        email: 'trnthang@gmail.com',
        name: 'test',
      },
      'test',
    );
  }
}

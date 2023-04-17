import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(user: any, token: string) {
    const url = `http://localhost:3000/auth/verify?access_token=${token}`;
    const result = await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirm', // `.hbs` extension is appended automatically
      //the value to hbs file.
      context: {
        name: user.name,
        url,
      },
    });

    return result;
  }
}

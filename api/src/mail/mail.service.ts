import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(user: any, token: string) {
    const verifyUrl = process.env.MAIL_VERIFICATION_URL;
    const url = `${verifyUrl}${token}`;
    const result = await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to bWorks! Please confirm your Email',
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

import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { MailModuleOptions } from './mail.interface';
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    template: string,
    to: string,
    emailVars,
  ) {
    const gun = mailgun({
      apiKey: this.options.apiKey,
      domain: this.options.domain,
    });

    const data = {
      from: `The Food<jammnanbo@${this.options.domain}>`,
      to,
      subject: subject,
      text: 'Testing some Mailgun awesomeness!',
      template,
      ...emailVars,
    };
    console.log(data);

    gun.messages().send(data);
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'Confirm', 'apjammanbo@gmail.com', {
      'v:username': email,
      'v:code': code,
    });
  }
}

import { Module } from '@nestjs/common';
import { SmtpMailerCreator } from './smtp/smtpMailer.creator';

@Module({
  providers: [SmtpMailerCreator]
})
export class MailerModule {}

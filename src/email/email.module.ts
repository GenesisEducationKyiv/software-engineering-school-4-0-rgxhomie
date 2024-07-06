import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SmtpMailerCreator } from 'src/mailer/smtp/smtpMailer.creator';
import { NbuProviderCreator } from 'src/rate/nbu/nbuProvider.creator';

@Module({
  providers: [EmailService, PrismaService, NbuProviderCreator, SmtpMailerCreator]
})
export class EmailModule {}

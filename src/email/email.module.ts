import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { RateService } from 'src/rate/rate.service';

@Module({
  providers: [EmailService, PrismaService, MailerService, RateService],
})
export class EmailModule {}

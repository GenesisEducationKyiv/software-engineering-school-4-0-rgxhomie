import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { RateService } from 'src/rate/rate.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, PrismaService, MailerService, RateService],
  imports: []
})
export class EmailModule {}

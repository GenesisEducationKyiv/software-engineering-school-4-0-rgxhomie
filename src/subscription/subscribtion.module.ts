import { Module } from '@nestjs/common';
import { SubscribtionService } from './subscribtion.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { RateService } from 'src/rate/rate.service';
import { SubscriptionController } from './subscribtion.controller';

@Module({
  providers: [SubscribtionService, PrismaService, MailerService, RateService],
  controllers: [SubscriptionController]
})
export class SubscribtionModule {}

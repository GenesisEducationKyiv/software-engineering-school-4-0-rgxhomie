import { Module } from '@nestjs/common';
import { SubscribtionService } from './subscribtion.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscriptionController } from './subscribtion.controller';

@Module({
  providers: [SubscribtionService, PrismaService],
  controllers: [SubscriptionController]
})
export class SubscribtionModule {}

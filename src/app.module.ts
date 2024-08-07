import { Module } from '@nestjs/common';
import { RateModule } from './rate/rate.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';
import { MailerModule } from './mailer/mailer.module';
import { SubscribtionModule } from './subscription/subscribtion.module';
import { NbuProviderCreator } from './rate/nbu/nbuProvider.creator';

@Module({
  imports: [
    RateModule, EmailModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    CacheModule.register({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MailerModule,
    SubscribtionModule
  ],
  controllers: [],
  providers: [ PrismaService, NbuProviderCreator ]
})
export class AppModule {}

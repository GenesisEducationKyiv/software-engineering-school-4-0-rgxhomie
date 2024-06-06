import { ConflictException, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RateService } from 'src/rate/rate.service';

@Injectable()
export class EmailService {
    constructor(
        private prismaService: PrismaService,
        private mailerService: MailerService,
        private rateService: RateService
    ) {}

    async trySubscribeEmail(email) {
        const subscribedEmail = await this.prismaService.emails.findFirst({where: {email}});

        if (subscribedEmail && subscribedEmail.is_subscribed) throw new ConflictException();

        if (subscribedEmail) await this.prismaService.emails.update({where: {email}, data: {is_subscribed: true}});
        else await this.prismaService.emails.create({data: {email}});

        return;
    }

    @Cron('0 12 * * *')
    // @Cron('* * * * *') <- every minute for testing
    async bulkSend() {
        const toList = await this.prismaService.emails.findMany({where: {is_subscribed: true}});
        const rate = await this.rateService.getCurrentRate();

        toList.forEach(async receiver => {
            await this.mailerService.sendRate(receiver.email, rate);
        });
    }
}

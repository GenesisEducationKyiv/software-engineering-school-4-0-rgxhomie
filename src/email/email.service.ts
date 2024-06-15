import { Injectable } from '@nestjs/common';
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

    async sendRate(to, rate) { 
        const { subject, html } = this.getRateTemplate(rate);

        const from = `Rate notifications service`
        
        await this.mailerService.send({
            from,
            to,
            subject,
            html
        })
    }

    @Cron('0 12 * * *')
    // @Cron('* * * * *') <- every minute for testing
    async bulkSend() {
        const toList = await this.prismaService.emails.findMany({where: {is_subscribed: true}});
        const rate = await this.rateService.getCurrentRate();

        toList.forEach(async receiver => {
            await this.sendRate(receiver.email, rate);
        });
    }
}

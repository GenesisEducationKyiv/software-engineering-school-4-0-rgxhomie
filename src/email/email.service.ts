import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SmtpMailerCreator } from 'src/mailer/smtp/smtpMailer.creator';
import { IMailer } from 'src/mailer/types/mailer.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { NbuProviderCreator } from 'src/rate/nbu/nbuProvider.creator';
import { IRateProvider } from 'src/rate/types/provider.interface';

@Injectable()
export class EmailService {
    private mailer: IMailer
    private rateProvider: IRateProvider

    constructor(
        private prismaService: PrismaService,
        private mailerCreator: SmtpMailerCreator,
        private providerCreator: NbuProviderCreator
    ) {
        this.mailer = mailerCreator.createMailer()
        this.rateProvider = providerCreator.createProvider()
    }

    async sendRate(to, rate) { 
        const { subject, html } = this.getRateTemplate(rate);

        
        await this.mailer.send({
            to,
            subject,
            html
        })
    }

    getRateTemplate(rate) {
        return {
            subject: `Your update on USH-UAH rate`,
            html: `
                    <div>
                        <h1>Here is the current exchange rate:</h1>
                        <p>1 usd = ${rate} uah</p>
                    </div>
                `
        }
    }

    // @Cron('0 12 * * *')
    @Cron('* * * * *') // <- every minute for testing
    async bulkSend() {
        const toList = await this.prismaService.emails.findMany({where: {is_subscribed: true}});
        const rate = await this.rateProvider.getRate();

        toList.forEach(async receiver => {
            await this.sendRate(receiver.email, rate);
        });
    }
}

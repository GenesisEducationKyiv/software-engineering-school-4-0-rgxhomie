import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter;
    
    constructor(
        private configService: ConfigService
    ) {
        this.transporter = nodemailer.createTransport({
            host: configService.get('SMTP_HOST'),
            port: configService.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: configService.get('SMTP_USER'),
                pass: configService.get('SMTP_PASSWORD')
            }
        });
    }

    async sendRate(to, rate) {
        try {
            await this.transporter.sendMail({
                from: this.configService.get('SMTP_USER'),
                to,
                subject: 'USD-UAH Rate',
                text: '',
                html:
                    `
                        <div>
                            <h1>Here is the current exchange rate:</h1>
                            <p>1 usd = ${rate} uah</p>
                        </div>
                    `
            });
        } catch (error) {
            
        }
    }
}
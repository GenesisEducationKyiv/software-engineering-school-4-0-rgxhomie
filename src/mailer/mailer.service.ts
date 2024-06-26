import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import ISendMailConfig from './ISendMailConfig.interface';

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

    async send(config: ISendMailConfig) {
        try {
            await this.transporter.sendMail({
                from: config.from,
                to: config.to,
                subject: config.subject,
                text: config.text,
                html: config.html
            })
        } catch(error) {
            console.error(`Email send error`, { error })
        }
    }
}
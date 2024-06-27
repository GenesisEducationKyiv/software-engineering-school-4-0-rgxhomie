import { Injectable } from "@nestjs/common";
import { IMailer } from "../types/mailer.interface";
import { IMailerCreator } from "../types/mailerCreator.interface";
import { SmtpMailerService } from "./smtpMailer.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SmtpMailerCreator implements IMailerCreator {
    constructor (
        private configService: ConfigService
    ) {}

    createMailer(): IMailer {
        return new SmtpMailerService(this.configService)
    }
}
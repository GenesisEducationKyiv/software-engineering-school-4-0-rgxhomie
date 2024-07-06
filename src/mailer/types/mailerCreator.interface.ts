import { IMailer } from "./mailer.interface";

export interface IMailerCreator {
    createMailer(): IMailer
}
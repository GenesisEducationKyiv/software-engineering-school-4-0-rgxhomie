export interface ISendMailConfig {
    to: string,
    subject: string,
    text?: string,
    html?: string
}

export interface IMailer {
    send(config: ISendMailConfig): void
}
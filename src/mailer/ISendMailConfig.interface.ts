export default interface ISendMailConfig {
    from: string,
    to: string,
    subject: string,
    text?: string,
    html?: string
}
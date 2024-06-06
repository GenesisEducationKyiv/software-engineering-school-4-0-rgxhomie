export default () => ({
    api: {
        url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
        cachettl: 300000
    },
    mailer: {
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD
    }
});

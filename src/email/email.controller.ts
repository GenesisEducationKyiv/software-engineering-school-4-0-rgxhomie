import { Body, Controller, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SubscriptionDto } from './subscription.dto';

@Controller('subscribe')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @Post() 
    async subscribeEmail(@Body() params: SubscriptionDto) {
        return this.emailService.trySubscribeEmail(params.email);
    }
}

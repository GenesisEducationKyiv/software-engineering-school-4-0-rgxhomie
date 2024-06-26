import { Body, Controller, Post } from '@nestjs/common';
import { SubscriptionDto } from './subscription.dto';
import { SubscribtionService } from './subscribtion.service';

@Controller('subscribe')
export class SubscriptionController {
    constructor(private subscriptionService: SubscribtionService) {}

    @Post() 
    async subscribeEmail(@Body() params: SubscriptionDto) {
        return this.subscriptionService.trySubscribeEmail(params.email);
    }
}

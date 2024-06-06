import { Controller, Get } from '@nestjs/common';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
    constructor(private rateService: RateService) {}

    @Get()
    async getRate() {
        return await this.rateService.getCurrentRate();
    }
}

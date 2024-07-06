import { Controller, Get } from '@nestjs/common';
import { NbuProviderCreator } from './nbu/nbuProvider.creator';

@Controller('rate')
export class RateController {
    constructor(
        private providerCreator: NbuProviderCreator
    ) {}

    @Get()
    async getRate() {
        return await this.providerCreator.createProvider().getRate();
    }
}

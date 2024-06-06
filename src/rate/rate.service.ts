import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as _ from 'lodash';

@Injectable()
export class RateService {
    constructor(
        private configService: ConfigService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async getCurrentRate(): Promise<Number> {
        const cahedRate = await this.getCachedRate();
        if (cahedRate) return cahedRate;

        const rate = await this.getNewRate();

        this.cacheNewRate(rate);

        return rate;
    }

    private async getCachedRate(): Promise<Number | null> {
        return await this.cacheManager.get('rate');
    }

    private async cacheNewRate(value: Number): Promise<void> {
        const cacheTtl = parseInt(this.configService.getOrThrow('api.cachettl'));
        
        return await this.cacheManager.set('rate', value, cacheTtl);
    }

    private async getNewRate(): Promise<Number> {
        try {
            const apiUrl = this.configService.getOrThrow(`api.url`);

            const data = await axios.get<Object[]>(apiUrl);

            const rate = data.data.find(curr => _.get(curr, 'cc', null) === 'USD');

            if (_.isNil(rate) || _.isEmpty(rate)) throw new Error('Rate was not found');

            return _.get(rate, 'rate');
        } catch (error) {
            console.log(`RateProvider Error: `, { error });

            throw new InternalServerErrorException('Provider Error');
        }
    }
}

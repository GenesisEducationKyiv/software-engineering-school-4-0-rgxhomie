import { Cache } from '@nestjs/cache-manager';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as _ from 'lodash';
import IRate from './IRate.interface';
import { IRateProvider } from '../types/provider.interface';

export class NbuProviderService implements IRateProvider {
    constructor(
        private configService: ConfigService,
        private cacheManager: Cache
    ) {}

    async getRate(): Promise<number> {
        const cachedRate = await this.getCachedRate();
        if (cachedRate) return cachedRate;

        const rate = await this.getNewRate();

        this.cacheNewRate(rate);

        return rate;
    }

    private async getCachedRate(): Promise<number | null> {
        return await this.cacheManager.get('rate');
    }

    private async cacheNewRate(value: number): Promise<void> {
        const cacheTtl = parseInt(this.configService.getOrThrow('api.cachettl'));
        
        return await this.cacheManager.set('rate', value, cacheTtl);
    }

    private async getNewRate(): Promise<number> {
        try {
            const apiUrl = this.configService.getOrThrow(`api.url`);

            const data = await axios.get<IRate[]>(apiUrl);

            const rate = data.data.find(curr => _.get(curr, 'cc', null) === 'USD');

            if (_.isNil(rate) || _.isEmpty(rate)) throw new Error('Rate was not found');

            return _.get(rate, 'rate');
        } catch (error) {
            console.error(`RateProvider Error: `, { error });

            throw new InternalServerErrorException('Provider Error');
        }
    }
}

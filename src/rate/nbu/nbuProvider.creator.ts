import { Inject, Injectable } from "@nestjs/common";
import { IRateProvider } from "../types/provider.interface";
import { IProviderCreator } from "../types/providerCreator.interface";
import { NbuProviderService } from "./nbuProvider.service";
import { ConfigService } from "@nestjs/config";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

@Injectable()
export class NbuProviderCreator implements IProviderCreator {
    constructor (
        private configService: ConfigService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    createProvider(): IRateProvider {
        return new NbuProviderService(this.configService, this.cacheManager)
    }
}
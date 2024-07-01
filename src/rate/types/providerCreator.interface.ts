import { IRateProvider } from "./provider.interface";

export interface IProviderCreator {
    createProvider(): IRateProvider
}

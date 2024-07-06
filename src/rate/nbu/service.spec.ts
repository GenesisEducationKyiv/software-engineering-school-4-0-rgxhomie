import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { IRateProvider } from '../types/provider.interface';
import { NbuProviderCreator } from './nbuProvider.creator';
import { NbuProviderService } from './nbuProvider.service';

describe('Nbu Provider Service', () => {
  let service: IRateProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NbuProviderCreator, ConfigService],
    }).compile();

    const creator = module.get<NbuProviderCreator>(NbuProviderCreator);

    service = creator.createProvider()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be an nbu provider', () => {
    expect(service).toBeInstanceOf(NbuProviderService);
  })

  it('should return rate', async () => {
    await expect(service.getRate()).resolves.toBeGreaterThanOrEqual(0);
  })
});

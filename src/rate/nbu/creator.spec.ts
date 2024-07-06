import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NbuProviderCreator } from './nbuProvider.creator';
import { NbuProviderService } from './nbuProvider.service';

describe('NbuProviderCreator', () => {
  let creator: NbuProviderCreator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NbuProviderCreator,
        ConfigService
      ],
    }).compile();

    creator = module.get<NbuProviderCreator>(NbuProviderCreator);
  });

  it('should be defined', () => {
    expect(creator).toBeDefined();
  });

  it('should create nbu provider', () => {
    expect(creator.createProvider()).toBeInstanceOf(NbuProviderService);
  })
});

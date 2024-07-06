import { Test, TestingModule } from '@nestjs/testing';
import { NbuProviderCreator } from 'src/rate/nbu/nbuProvider.creator';
import { RateController } from 'src/rate/rate.controller';

describe('RateController', () => {
  let rateController: RateController;
  let nbuProviderCreator: NbuProviderCreator;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RateController],
      providers: [
        {
          provide: NbuProviderCreator,
          useValue: {
            createProvider: jest.fn().mockReturnValue({
              getRate: jest.fn().mockResolvedValue('mockRate'),
            }),
          },
        },
      ],
    }).compile();

    rateController = moduleRef.get<RateController>(RateController);
    nbuProviderCreator = moduleRef.get<NbuProviderCreator>(NbuProviderCreator);
  });

  it('should return rate from provider', async () => {
    const result = await rateController.getRate();
    expect(result).toBe('mockRate');
    expect(nbuProviderCreator.createProvider).toHaveBeenCalled();
    expect(nbuProviderCreator.createProvider().getRate).toHaveBeenCalled();
  });
});

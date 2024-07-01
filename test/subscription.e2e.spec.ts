import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionController } from 'src/subscription/subscribtion.controller';
import { SubscribtionService } from 'src/subscription/subscribtion.service';
import { SubscriptionDto } from 'src/subscription/subscription.dto';

describe('SubscriptionController', () => {
  let subscriptionController: SubscriptionController;
  let subscriptionService: SubscribtionService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [
        {
          provide: SubscribtionService,
          useValue: {
            trySubscribeEmail: jest.fn().mockResolvedValue('mockResponse'),
          },
        },
      ],
    }).compile();

    subscriptionController = moduleRef.get<SubscriptionController>(SubscriptionController);
    subscriptionService = moduleRef.get<SubscribtionService>(SubscribtionService);
  });

  it('should subscribe email and return response', async () => {
    const subscriptionDto: SubscriptionDto = { email: 'test@example.com' };
    const result = await subscriptionController.subscribeEmail(subscriptionDto);
    expect(result).toBe('mockResponse');
    expect(subscriptionService.trySubscribeEmail).toHaveBeenCalledWith('test@example.com');
  });
});

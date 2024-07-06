import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscribtionService } from './subscribtion.service';

const mockEmailRow = {
    id: '',
    email: '',
    is_subscribed: true
};

describe('SubscriptionService', () => {
  let service: SubscribtionService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscribtionService,
        {
            provide: PrismaService,
            useValue: {
                emails: {
                    findFirst: jest.fn().mockResolvedValue(mockEmailRow),
                    update: jest.fn().mockResolvedValue(mockEmailRow),
                    create: jest.fn().mockResolvedValue(mockEmailRow)
                }
            }
        }
      ],
    }).compile();

    service = module.get<SubscribtionService>(SubscribtionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sould subscribe new email', async () => {
    const mockEmail = 'test@test.test';

    await expect(service.trySubscribeEmail(mockEmail)).resolves.toBeUndefined();
  })
});

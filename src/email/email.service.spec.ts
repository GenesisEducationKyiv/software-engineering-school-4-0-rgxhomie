import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { SmtpMailerCreator } from 'src/mailer/smtp/smtpMailer.creator';
import { PrismaService } from 'src/prisma/prisma.service';
import { NbuProviderCreator } from 'src/rate/nbu/nbuProvider.creator';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: PrismaService,
          useValue: {
            emails: {
              findMant: jest.fn()
            }
          }
        },
        {
          provide: NbuProviderCreator,
          useValue: {
            createProvider: jest.fn()
          }
        },
        {
          provide: SmtpMailerCreator,
          useValue: {
            createMailer: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return template', () => {
    const mockRate = 10;

    expect(service.getRateTemplate(mockRate)).toBeDefined();
  })

  it('should throw error', () => {
    const mockTo = 'test@nonexist.wtf';
    const mockRate = 10;

    expect(service.sendRate(mockTo, mockRate)).resolves.toThrow();
  })
});

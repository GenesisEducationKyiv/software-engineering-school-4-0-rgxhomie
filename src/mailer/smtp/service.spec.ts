import { Test, TestingModule } from '@nestjs/testing';
import { SmtpMailerCreator } from './smtpMailer.creator';
import { SmtpMailerService } from './smtpMailer.service';
import { IMailer, ISendMailConfig } from '../types/mailer.interface';
import { ConfigService } from '@nestjs/config';

describe('SmtpMailerService', () => {
  let service: IMailer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmtpMailerCreator, ConfigService],
    }).compile();

    const creator = module.get<SmtpMailerCreator>(SmtpMailerCreator);

    service = creator.createMailer()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be an smtp service', () => {
    expect(service).toBeInstanceOf(SmtpMailerService);
  })

  it('should throw an error', async () => {
    const mockConfig: ISendMailConfig = {
        to: '',
        subject: ''
    }
    
    await expect(service.send(mockConfig)).resolves.toBeUndefined();
  })
});

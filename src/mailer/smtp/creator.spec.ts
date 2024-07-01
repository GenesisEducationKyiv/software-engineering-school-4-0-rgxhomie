import { Test, TestingModule } from '@nestjs/testing';
import { SmtpMailerCreator } from './smtpMailer.creator';
import { SmtpMailerService } from './smtpMailer.service';
import { ConfigService } from '@nestjs/config';
import { IMailer } from '../types/mailer.interface';

describe('SmtpMailerCreator', () => {
  let creator: SmtpMailerCreator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmtpMailerCreator,
        ConfigService
      ],
    }).compile();

    creator = module.get<SmtpMailerCreator>(SmtpMailerCreator);
  });

  it('should be defined', () => {
    expect(creator).toBeDefined();
  });

  it('should create smtp service', () => {
    expect(creator.createMailer()).toBeInstanceOf(SmtpMailerService)
  })
});

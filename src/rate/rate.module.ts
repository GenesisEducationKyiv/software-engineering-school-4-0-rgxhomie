import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { NbuProviderCreator } from './nbu/nbuProvider.creator';

@Module({
  controllers: [RateController],
  providers: [NbuProviderCreator],
  exports: [NbuProviderCreator]
})
export class RateModule {}

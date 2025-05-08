import { Module } from '@nestjs/common';
import { TranscodingController } from './transcoding.controller';
import { TranscodingService } from './transcoding.service';

@Module({
  imports: [],
  controllers: [TranscodingController],
  providers: [TranscodingService],
})
export class TranscodingModule {}

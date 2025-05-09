import { Module } from '@nestjs/common';
import { TranscodingController } from './transcoding.controller';
import { TranscodingService } from './transcoding.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { kafkaConfig } from '@app/common/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: kafkaConfig('transcoding'),
      },
    ]),
  ],
  controllers: [TranscodingController],
  providers: [TranscodingService],
})
export class TranscodingModule {}

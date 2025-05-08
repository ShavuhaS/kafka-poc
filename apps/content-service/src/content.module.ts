import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { kafkaConfig } from '../../../lib/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: kafkaConfig('content-service'),
      },
    ])
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}

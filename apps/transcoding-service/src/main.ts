import { NestFactory } from '@nestjs/core';
import { TranscodingModule } from './transcoding.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { kafkaConfig } from '../../../lib/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TranscodingModule, {
    transport: Transport.KAFKA,
    options: kafkaConfig('transcoding-service'),
  });

  await app.listen();
}
bootstrap();

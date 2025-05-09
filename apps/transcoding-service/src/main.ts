import { NestFactory } from '@nestjs/core';
import { TranscodingModule } from './transcoding.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { kafkaConfig } from '@app/common/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TranscodingModule, {
    transport: Transport.KAFKA,
    options: kafkaConfig('transcoding'),
  });

  await app.listen();
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ContentModule } from './content.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { kafkaConfig } from '../../../lib/config';

async function bootstrap() {
  const app = await NestFactory.create(ContentModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: kafkaConfig('content-service'),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

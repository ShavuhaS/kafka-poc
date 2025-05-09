import { NestFactory } from '@nestjs/core';
import { ContentModule } from './content.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { kafkaConfig } from '@app/common/config';

async function bootstrap() {
  const app = await NestFactory.create(ContentModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: kafkaConfig('content'),
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

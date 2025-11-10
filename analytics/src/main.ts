import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: 'analytics_queue',
        queueOptions: {
          durable: true,
        },
        prefetchCount: 5,
      },
    },
  );

  await app.listen();
  console.log('📊 Analytics Service listening on analytics_queue');
  console.log(
    `🔗 RabbitMQ: ${process.env.RABBITMQ_URL || 'amqp://localhost:5672'}`,
  );
}
bootstrap();

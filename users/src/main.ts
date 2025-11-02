import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// async function bootstrap() {
// const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
//   transport: Transport.TCP,
//   options: { host: '127.0.0.1', port: 3000 },
// });
//   await app.listen();
//   console.log(`Users Microservice is running in ${process.env.PORT}`)
// }

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: true,
      },
    },
  },);
  await app.listen();
  console.log(`Users Microservice is running in ${process.env.PORT}`)
}
bootstrap();

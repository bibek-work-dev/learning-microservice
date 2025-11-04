import { ClientsModule, Transport } from '@nestjs/microservices';

export const PostsClient = ClientsModule.register([
  {
    name: 'POSTS_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: { durable: true },
    },
  },
]);

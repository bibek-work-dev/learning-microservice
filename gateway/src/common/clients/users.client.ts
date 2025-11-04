import { ClientsModule, Transport } from '@nestjs/microservices';

export const UsersClient = ClientsModule.register([
  {
    name: 'USERS_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['ampq://localhost:5672'],
      queue: 'users_queue',
      queueOptions: { durable: true },
    },
  },
]);

import { ClientsModule, Transport } from '@nestjs/microservices';

export const AnalyticsClient = ClientsModule.register([
  {
    name: 'NOTIFICATION_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'notification_queue',
      queueOptions: { durable: true },
    },
  },
]);

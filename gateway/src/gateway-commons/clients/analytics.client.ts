import { ClientsModule, Transport } from '@nestjs/microservices';

export const AnalyticsClient = ClientsModule.register([
  {
    name: 'ANALYTICS_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'analytics_queue',
      queueOptions: { durable: true },
    },
  },
]);

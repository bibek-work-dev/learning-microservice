import { ClientsModule, Transport } from '@nestjs/microservices';

export const AnalyticsClient = ClientsModule.register([
  {
    name: 'EMAIL_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'email_queue',
      queueOptions: { durable: true },
    },
  },
]);

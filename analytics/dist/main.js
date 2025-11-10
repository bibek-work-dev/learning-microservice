"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'analytics_queue',
            queueOptions: {
                durable: true,
            },
            prefetchCount: 5,
        },
    });
    await app.listen();
    console.log('📊 Analytics Service listening on analytics_queue');
    console.log(`🔗 RabbitMQ: ${process.env.RABBITMQ_URL || 'amqp://localhost:5672'}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
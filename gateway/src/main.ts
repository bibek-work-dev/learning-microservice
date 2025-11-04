import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './gateway-commons/interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { RpcHttpExceptionFilter } from './gateway-commons/filters/rpc-http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new RpcHttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(4000);
  console.log('🚀 Gateway running on http://localhost:4000');
}
bootstrap();

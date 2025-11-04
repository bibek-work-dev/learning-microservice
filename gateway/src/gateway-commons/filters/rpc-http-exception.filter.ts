import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcHttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof RpcException) {
      return response.status(400).json({
        status: 'error',
        message: exception.getError(),
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

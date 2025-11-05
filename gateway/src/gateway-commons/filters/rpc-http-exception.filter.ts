import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcHttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log('exception', exception);

    if (exception instanceof RpcException) {
      console.log('here in expception');
      return response.status(400).json({
        success: false,
        status: 'error',
        message: exception.getError(),
      });
    }

    console.log('done');

    return response.status(500).json({
      success: false,
      status: 'error',
      message: 'Internal server error',
    });
  }
}

// in async processing, DLQ and final format is used. while for sync processing, crafted response is given and DLQ Is involved.

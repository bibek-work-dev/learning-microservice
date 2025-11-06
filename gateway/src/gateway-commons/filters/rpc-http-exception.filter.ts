import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class RpcHttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.getType();
    console.log('ctx', ctx);

    if (ctx == 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      console.log(exception, exception instanceof HttpException);

      if (exception instanceof HttpException) {
        const res = exception.getResponse();
        return response.status(exception.getStatus()).json(res);
      }

      if (
        exception &&
        typeof exception === 'object' &&
        exception['status'] &&
        exception['message']
      ) {
        const message = (exception as any).message;
        const status = (exception as any).status;
        return response.status(400).json({
          success: false,
          status: status,
          message: message,
        });
      }

      return response.status(500).json({
        success: false,
        status: 'error',
        message: 'Internal server error',
      });
    }
  }
}

// in async processing, DLQ and final format is used. while for sync processing, crafted response is given and DLQ Is involved.

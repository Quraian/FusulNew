import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    // Log based on status code
    const logMessage = `${request.method} ${request.url} ${status}`;
    if (status >= 500) {
      this.logger.error(
        logMessage,
        (exception as Error)?.stack,
        HttpExceptionFilter.name
      );
    } else if (status >= 400) {
      this.logger.warn(
        `${logMessage} - ${JSON.stringify(message)}`,
        HttpExceptionFilter.name
      );
    }

    response.status(status).json(errorResponse);
  }
}

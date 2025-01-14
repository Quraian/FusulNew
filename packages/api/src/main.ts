import {
  INestApplication,
  LogLevel,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { isProduction, isTesting, readAppPort } from '@fusul/common';
import { AppModule } from './app.module';
import { DelayInterceptor } from './common/delay.interceptor';
import { LoggerInterceptor } from './common/logger.interceptor';

const globalPrefix = 'api';

async function bootstrap() {
  const logLevels: LogLevel[] = isProduction()
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'debug', 'verbose'];
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });
  const port = readAppPort();

  prepareApp(app);

  // for unit/integrated testing, the server will not be running to make sure that mocked apis will be used
  if (!isTesting()) {
    await app.listen(port, '0.0.0.0');
    // app.listen() needs to be called before calling app.getUrl()
    Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
  }
}

export function prepareApp(app: INestApplication) {
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new LoggerInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipMissingProperties: true,
    })
  );
  app.enableCors();
  app.enableShutdownHooks();

  const delayArg = process.argv.find((a) => a.startsWith('delay'));
  if (delayArg) {
    const parsed = Number.parseInt(delayArg.split('=')[1]);
    const delay = isNaN(parsed) ? 2 : parsed;
    Logger.warn(`Application is running with ${delay} seconds delay`);
    app.useGlobalInterceptors(new DelayInterceptor(delay));
  }
}

bootstrap();

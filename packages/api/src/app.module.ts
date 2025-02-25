import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

import { WeatherModule } from './weather/weather.module';
import { PrismaModule } from './prisma/prisma.module';
import { CalendarsModule } from './calendars/calendars.module';
import { RedisModule } from './redis/redis.module';
import { CitiesModule } from './cities/cities.module';
import { HealthModule } from './health/health.module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '../../..', 'dist/packages/mobile'),
        serveRoot: '/app',
      },
      {
        rootPath: join(__dirname, '../../..', 'dist/packages/website'),
        exclude: ['/api/{*path}'],
      }
    ),
    PrismaModule,
    WeatherModule,
    RedisModule,
    CalendarsModule,
    CitiesModule,
    HealthModule,
  ],
})
export class AppModule {}

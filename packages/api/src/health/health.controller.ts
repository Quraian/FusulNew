import { Controller, Get } from '@nestjs/common';
import { RedisOptions, Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

import { PrismaService } from '../prisma/prisma.service';
import { buildWeatherUrl } from '../common/utils';
import { readAppDomain, readRedisHost, readRedisPort } from '@fusul/common';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private prismaService: PrismaService
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const appDomain = readAppDomain();
    const redisInfo = {
      host: readRedisHost(),
      port: readRedisPort(),
    };
    const riyadhWeatherUrl = buildWeatherUrl('riyadh');

    return this.health.check([
      () =>
        this.http.pingCheck('Calendars', `https://${appDomain}/api/calendars`),
      () => this.db.pingCheck('Database', this.prismaService),
      () =>
        this.microservice.pingCheck<RedisOptions>(
          `Redis: ${redisInfo.host}:${redisInfo.port}`,
          {
            transport: Transport.REDIS,
            options: redisInfo,
          }
        ),
      () =>
        this.http.pingCheck(
          `Weather API: ${riyadhWeatherUrl}`,
          riyadhWeatherUrl
        ),
    ]);
  }
}

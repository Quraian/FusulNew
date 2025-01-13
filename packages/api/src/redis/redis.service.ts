import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

import {
  WeatherFromApi,
  isTesting,
  readRedisHost,
  readRedisPort,
  readRedisUrl,
} from '@fusul/common';

@Injectable()
export class RedisService {
  private redis?: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    const url = readRedisUrl();
    const host = readRedisHost();
    const port = readRedisPort();

    try {
      this.redis = url ? new Redis(url) : new Redis({ host, port });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getWeatherOfCity(cityName: string): Promise<WeatherFromApi | null> {
    try {
      const data = await this.redis?.get(cityName);

      if (data) {
        return JSON.parse(data) as WeatherFromApi;
      }
    } catch (error) {
      this.logger.error(error);
    }

    return null;
  }

  cacheWeather(cityName: string, data: WeatherFromApi) {
    return this.redis?.setex(cityName, 60, JSON.stringify(data));
  }

  flushAll() {
    if (isTesting()) {
      return this.redis?.flushall();
    }

    return Promise.resolve();
  }
}

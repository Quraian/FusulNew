import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosError } from 'axios';

import { Weather, WeatherFromApi } from '@fusul/common';
import { CitiesService } from '../cities/cities.service';
import { buildWeatherUrl } from '../common/utils';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private citiesService: CitiesService,
    private httpService: HttpService,
    private redisService: RedisService
  ) {}

  async getWeather(cityName: string): Promise<Weather> {
    const city = await this.citiesService.getCityByName(cityName);

    try {
      let weatherData = await this.redisService.getWeatherOfCity(city.nameEn);

      if (!weatherData) {
        const url = buildWeatherUrl(city.nameEn);

        this.logger.verbose(`FETCHING ${encodeURI(url)}`);

        const { data } =
          await this.httpService.axiosRef.get<WeatherFromApi>(url);

        await this.redisService.cacheWeather(city.nameEn, data);

        weatherData = data;
      }

      const { main, weather } = weatherData;
      const first = weather[0];

      return {
        cityId: city.id,
        city,
        temperature: main.temp,
        main: first?.main || '',
        description: first?.description || '',
        icon: first?.icon || '',
      };
    } catch (error) {
      // TODO: might need to add the following code for better error logging
      // throw typeof error.response?.data === 'object' && error.response.data != null && 'message' in error.response.data
      //           ? error.response.data.message
      //           : error.message;
      const e = error instanceof AxiosError ? error.cause : error;

      this.logger.error(e);
    }

    throw new BadRequestException(`Unable to get weather for ${cityName}`);
  }
}

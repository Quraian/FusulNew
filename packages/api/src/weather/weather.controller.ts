import { Controller, Get, NotFoundException, Query } from '@nestjs/common';

import { WeatherService } from './weather.service';
import { GetWeatherQuery } from './get-weather-query';
import { CitiesService } from '../cities/cities.service';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly citiesService: CitiesService
  ) {}

  @Get()
  async getWeather(@Query() query: GetWeatherQuery) {
    const { cityName, lat, lon } = query;

    let name = cityName;

    if (!name && lat && lon) {
      name = this.citiesService.findClosestCityByCoords(lat, lon)?.nameEn;
    }

    if (name) {
      const weather = await this.weatherService.getWeather(name);

      if (weather) {
        return weather;
      }
    }

    throw new NotFoundException(`Unable to get weather for ${name || ''}`);
  }
}

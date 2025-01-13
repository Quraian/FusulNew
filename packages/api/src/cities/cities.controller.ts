import { Controller, Get, Query } from '@nestjs/common';

import { GetWeatherQuery } from '../weather/get-weather-query';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async getWeather(@Query() query: GetWeatherQuery) {
    const { cityName, lat, lon } = query;

    let name = cityName;

    if (!name && lat && lon) {
      name = this.citiesService.findClosestCityByCoords(lat, lon)?.nameEn;
    }

    if (name) {
      return await this.citiesService.getCityByName(name);
    }

    return null;
  }
}

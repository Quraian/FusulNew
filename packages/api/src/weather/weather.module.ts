import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { CitiesModule } from '../cities/cities.module';

@Module({
  imports: [HttpModule, CitiesModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}

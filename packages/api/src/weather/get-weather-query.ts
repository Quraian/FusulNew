import { IsOptional, IsNumberString } from 'class-validator';

export class GetWeatherQuery {
  @IsOptional()
  cityName?: string;

  @IsOptional()
  @IsNumberString()
  lat?: number;

  @IsOptional()
  @IsNumberString()
  lon?: number;
}

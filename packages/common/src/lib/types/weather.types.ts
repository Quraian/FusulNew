import { z } from 'zod';

import { CitySchema } from './geo.types';

export const WeatherSchema = z.object({
  cityId: z.number(),
  city: CitySchema.optional(),
  temperature: z.number(),
  main: z.string().min(1),
  description: z.string(),
  icon: z.string().length(3),
});

export type Weather = z.infer<typeof WeatherSchema>;

export interface WeatherFromApi {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

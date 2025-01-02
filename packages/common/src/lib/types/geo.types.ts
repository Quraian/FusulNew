import { z } from 'zod';

export const CitySchema = z.object({
  id: z.number(),
  name: z.string(),
  nameEn: z.string(),
  lon: z.number(),
  lat: z.number(),
});

export type City = z.infer<typeof CitySchema>;

export const GeoLocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type GeoLocation = z.infer<typeof GeoLocationSchema>;

import { City } from '../types';

function haversineDistance(
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
): number {
  const toRadian = (angle: number) => (Math.PI / 180) * angle;
  const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  lat1 = toRadian(lat1);
  lat2 = toRadian(lat2);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  return RADIUS_OF_EARTH_IN_KM * c;
}

export function findClosestCity(
  latitude: number,
  longitude: number,
  cities: Omit<City, 'id'>[]
): Omit<City, 'id'> | undefined {
  const withDistance = cities
    .map((c) => ({
      ...c,
      distance: haversineDistance([c.lat, c.lon], [latitude, longitude]),
    }))
    .sort((a, b) => a.distance - b.distance);

  if (withDistance.length > 0) {
    return withDistance[0];
  }

  return undefined;
}

import { City } from '@fusul/common';
import cities from './saudi-arabia.json';

export function getCities(): Omit<City, 'id'>[] {
  return cities;
}

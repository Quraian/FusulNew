import { Injectable, NotFoundException } from '@nestjs/common';

import { City, findClosestCity } from '@fusul/common';
import { PrismaService } from '../prisma/prisma.service';
import { getCities } from '@fusul/data';

@Injectable()
export class CitiesService {
  constructor(private prismaService: PrismaService) {}

  findClosestCityByCoords(lat: number, lon: number) {
    return findClosestCity(lat, lon, getCities());
  }

  async getCityByName(name: string): Promise<City> {
    const city = await this.prismaService.city.findFirst({
      where: {
        nameEn: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    if (!city) {
      throw new NotFoundException(`Unable to find city ${name}`);
    }

    return (
      city && {
        id: city.id,
        name: city.name,
        nameEn: city.nameEn,
        lon: city.lon,
        lat: city.lat,
      }
    );
  }
}

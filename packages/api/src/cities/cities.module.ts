import { Module } from '@nestjs/common';

import { CitiesService } from './cities.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CitiesController } from './cities.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}

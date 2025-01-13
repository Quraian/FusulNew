import { Test, TestingModule } from '@nestjs/testing';

import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('CitiesController', () => {
  let controller: CitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

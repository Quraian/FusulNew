import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule } from '../prisma/prisma.module';
import { CalendarsController } from './calendars.controller';
import { CalendarsService } from './calendars.service';

describe('CalendarController', () => {
  let controller: CalendarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CalendarsController],
      providers: [CalendarsService],
    }).compile();

    controller = module.get<CalendarsController>(CalendarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

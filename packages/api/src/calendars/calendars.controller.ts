import { Controller, Get, Param, Query } from '@nestjs/common';

import type { Calendar } from '@fusul/common';
import { CalendarByIdPipe } from './calendar-by-id-pipe';
import { CalendarsService } from './calendars.service';
import { GetEventsFilters, GetEventsQuery } from './dtos';

@Controller('calendars')
export class CalendarsController {
  constructor(private readonly calendarsService: CalendarsService) {}

  @Get('events')
  findEvents(@Query() query: GetEventsQuery) {
    return this.calendarsService.findEvents(query);
  }

  @Get('getCurrentPage')
  getCurrentPage(@Query() query: GetEventsFilters) {
    return this.calendarsService.getCurrentPage(query);
  }

  @Get()
  findAll() {
    return this.calendarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', CalendarByIdPipe) calendar: Calendar) {
    return calendar;
  }
}

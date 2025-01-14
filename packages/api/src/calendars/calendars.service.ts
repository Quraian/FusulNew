import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';

import { CalendarEventsPaginated, EventConstants } from '@fusul/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetEventsFilters, GetEventsQuery } from './dtos';

type CalendarIncludePeriods = Prisma.CalendarGetPayload<{
  include: { periods: true };
}>;

type CalendarIncludeEvents = Prisma.CalendarGetPayload<{
  include: { periods: { include: { events: true } } };
}>;

@Injectable()
export class CalendarsService {
  constructor(private prismaService: PrismaService) {}

  findAll(): Promise<CalendarIncludePeriods[]> {
    return this.prismaService.calendar.findMany({
      include: { periods: true },
    });
  }

  async findOne(id: number): Promise<CalendarIncludeEvents> {
    const calendar = await this.prismaService.calendar.findFirst({
      where: { id },
      include: { periods: { include: { events: true } } },
    });

    if (calendar) {
      return calendar;
    }

    throw new NotFoundException(`Calendar with id ${id} is unavailable`);
  }

  static buildFilters({ calendars }: GetEventsFilters) {
    return {
      ...(calendars?.length
        ? { period: { calendarId: { in: calendars } } }
        : {}),
    };
  }

  async getCurrentPage({
    perPage,
    calendars,
  }: GetEventsFilters): Promise<number> {
    const filters = CalendarsService.buildFilters({ calendars });
    const totalPast = await this.prismaService.calendarEvent.count({
      where: {
        start: { lte: new Date().toISOString() },
        ...filters,
      },
    });

    return (
      Math.floor(totalPast / (perPage || EventConstants.LIST_ITEMS_COUNT)) + 1
    );
  }

  async findEvents({
    page,
    perPage,
    calendars,
  }: GetEventsQuery): Promise<CalendarEventsPaginated> {
    const filters = CalendarsService.buildFilters({ calendars });

    return paginator({})(
      this.prismaService.calendarEvent,
      {
        where: { ...filters },
        orderBy: { start: 'asc' },
      },
      {
        page,
        perPage,
      }
    );
  }
}

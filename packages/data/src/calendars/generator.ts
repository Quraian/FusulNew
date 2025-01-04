/* eslint-disable @typescript-eslint/no-unused-vars */
import { CalendarGroup, Color, Prisma } from '@prisma/client';

import { DEFAULT_PREFERRED_CALENDARS_IDS } from '@fusul/common';
import { ProspectiveCalendar, ProspectivePeriod } from './types';
import {
  seasonsCalendar,
  islamicCalendar,
  pensionsCalendar,
} from './repeating';
import { schoolCalendar, govSalariesCalendar } from './non-repeating';
import { hijriCalendar } from './repeating/hijri-based/hijri';

// From https://stackoverflow.com/a/52544848/323926
function* range(start: number, end: number, step = 1) {
  if (end === undefined) [end, start] = [start, 0];
  for (let n = start; n <= end; n += step) yield n;
}

function generatePeriodsWithEvents(
  periods: ProspectivePeriod[],
  dateParser: (date: string) => Date,
  titleExtractor: (period: ProspectivePeriod) => string = (p) => p.title || '',
  enTitleExtractor: (period: ProspectivePeriod) => string = (p) =>
    p.titleEn || ''
): ProspectivePeriod[] {
  return periods.map((p) => ({
    title: titleExtractor(p),
    titleEn: enTitleExtractor(p),
    events: p.events.map((e) => ({
      ...e,
      start: dateParser(e.start).toISOString(),
    })),
  }));
}

export function generateCalendar(
  calendar: ProspectiveCalendar,
  upToYear?: number
): Prisma.CalendarUncheckedCreateInput {
  let periods: Prisma.CalendarPeriodUncheckedCreateNestedManyWithoutCalendarInput;

  if (upToYear) {
    const startDate = calendar.periods[0].events[0].start;
    const year = calendar.getFullYear(startDate);

    periods = {
      create: [...range(year, upToYear)]
        .map((year) => {
          const periods = generatePeriodsWithEvents(
            [calendar.periods[0]],
            (date: string) => {
              const event = calendar.setYear(date, year);
              return calendar.extraLogicToApply
                ? calendar.extraLogicToApply(event)
                : event;
            },
            () => year.toString(),
            () => year.toString()
          );
          if (calendar.extraLogicToApplyOnPeriods) {
            return calendar.extraLogicToApplyOnPeriods(periods);
          }

          return periods;
        })
        .flat()
        .map((p) => ({ ...p, events: { create: p.events } })),
    };
  } else {
    periods = {
      create: generatePeriodsWithEvents(
        calendar.periods,
        calendar.parseDate
      ).map((p) => ({ ...p, events: { create: p.events } })),
    };
  }

  const {
    parseDate,
    getFullYear,
    setYear,
    extraLogicToApply,
    extraLogicToApplyOnPeriods,
    ...rest
  } = calendar;

  return {
    ...rest,
    color: calendar.color as Color,
    group: calendar.group as CalendarGroup,
    periods,
  };
}

export function* generateCalendars(
  upToGregorianYear: number,
  upToHijriYear: number
): Generator<Prisma.CalendarUncheckedCreateInput> {
  /** Favorite calendars as seen {@link DEFAULT_PREFERRED_CALENDARS_IDS} */
  // ORDER MATTERS
  yield generateCalendar(seasonsCalendar, upToGregorianYear);
  yield generateCalendar(hijriCalendar, upToHijriYear);
  yield generateCalendar(islamicCalendar, upToHijriYear);
  yield generateCalendar(schoolCalendar);
  yield generateCalendar(govSalariesCalendar); // still not sure if gov salaries is repeating or not
  // ORDER MATTERS

  // Rest
  // yield generateCalendar(lunarStationsCalendar, upToGregorianYear);
  yield generateCalendar(pensionsCalendar, upToGregorianYear);
}

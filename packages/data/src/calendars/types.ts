import { Calendar, CalendarEvent, CalendarPeriod } from '@fusul/common';

export type ProspectiveCalendar = Omit<
  Omit<Calendar, 'periods'> & {
    periods: ProspectivePeriod[];
  },
  'id'
> & {
  parseDate: (date: string) => Date;
  getFullYear: (date: string) => number;
  setYear: (date: string, year: number) => Date;
  extraLogicToApply?: (date: Date) => Date;
  extraLogicToApplyOnPeriods?: (
    periods: ProspectivePeriod[]
  ) => ProspectivePeriod[];
};

export type ProspectivePeriod = Omit<
  Omit<CalendarPeriod, 'events' | 'title' | 'titleEn'> & {
    title: string;
    titleEn: string;
    events: ProspectiveEvent[];
  },
  'id' | 'calendarId'
>;

// export type ProspectiveEvent = Omit<Omit<CalendarEvent, 'title' | 'titleEn'> & { title?: string; titleEn?: string }, 'id' | 'periodId'>;

export type ProspectiveEvent = Omit<CalendarEvent, 'id' | 'periodId'>;

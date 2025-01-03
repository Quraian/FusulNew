import { CalendarGroup } from '@prisma/client';

import { setOnThursdayIfFallsOnWeekend } from '@fusul/common';
import {
  ProspectiveCalendar,
  ProspectiveEvent,
  ProspectivePeriod,
} from '../types';
import {
  CalendarGroupColors,
  DEFAULT_GREGORIAN_IMPLEMENTATION,
} from '../helper';

const events2024: ProspectiveEvent[] = [
  {
    title: 'معاش تقاعد شهر يناير',
    titleEn: 'January Pension',
    start: '2024-01-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر فبراير',
    titleEn: 'February Pension',
    start: '2024-02-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر مارس',
    titleEn: 'March Pension',
    start: '2024-03-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر أبريل',
    titleEn: 'April Pension',
    start: '2024-04-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر مايو',
    titleEn: 'May Pension',
    start: '2024-05-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر يونيو',
    titleEn: 'June Pension',
    start: '2024-06-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر يوليو',
    titleEn: 'July Pension',
    start: '2024-07-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر أغسطس',
    titleEn: 'August Pension',
    start: '2024-08-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر سبتمبر',
    titleEn: 'September Pension',
    start: '2024-09-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر أكتوبر',
    titleEn: 'October Pension',
    start: '2024-10-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر نوفمبر',
    titleEn: 'November Pension',
    start: '2024-11-01T00:00:00+03:00',
  },
  {
    title: 'معاش تقاعد شهر ديسمبر',
    titleEn: 'December Pension',
    start: '2024-12-01T00:00:00+03:00',
  },
];

const periods: ProspectivePeriod[] = [
  {
    title: '2024',
    titleEn: '2024',
    events: events2024,
  },
];

export const pensionsCalendar: ProspectiveCalendar = {
  title: 'معاشات التقاعد والتأمينات',
  titleEn: 'Pensions',
  description: '​موعد صرف معاشات التقاعد المدني والعسكري والتأمينات الإجتماعية',
  descriptionEn: 'Pensions',
  group: CalendarGroup.SalariesAndBenefits,
  color: CalendarGroupColors[CalendarGroup.SalariesAndBenefits],
  periods,
  ...DEFAULT_GREGORIAN_IMPLEMENTATION,
  extraLogicToApply: setOnThursdayIfFallsOnWeekend,
  extraLogicToApplyOnPeriods: (periods: ProspectivePeriod[]) => {
    // Law included on May 2024
    const [period2024, ...rest] = periods;
    const [, , , , ...includedEvents] = period2024['events'];

    return [{ ...period2024, events: includedEvents }, ...rest];
  },
};

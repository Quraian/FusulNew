import { CalendarGroup } from '@prisma/client';

import {
  ProspectiveCalendar,
  ProspectiveEvent,
  ProspectivePeriod,
} from '../types';
import {
  CalendarGroupColors,
  DEFAULT_GREGORIAN_IMPLEMENTATION,
} from '../helper';

const events2023: ProspectiveEvent[] = [
  {
    title: 'راتب شهر يناير',
    titleEn: 'January Salary',
    start: '2023-01-26T00:00:00+03:00',
  },
  {
    title: 'راتب شهر فبراير',
    titleEn: 'February Salary',
    start: '2023-02-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر مارس',
    titleEn: 'March Salary',
    start: '2023-03-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر أبريل',
    titleEn: 'April Salary',
    start: '2023-04-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر مايو',
    titleEn: 'May Salary',
    start: '2023-05-28T00:00:00+03:00',
  },
  {
    title: 'راتب شهر يونيو',
    titleEn: 'June Salary',
    start: '2023-06-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر يوليو',
    titleEn: 'July Salary',
    start: '2023-07-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر أغسطس',
    titleEn: 'August Salary',
    start: '2023-08-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر سبتمبر',
    titleEn: 'September Salary',
    start: '2023-09-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر أكتوبر',
    titleEn: 'October Salary',
    start: '2023-10-26T00:00:00+03:00',
  },
  {
    title: 'راتب شهر نوفمبر',
    titleEn: 'November Salary',
    start: '2023-11-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر ديسمبر',
    titleEn: 'December Salary',
    start: '2023-12-27T00:00:00+03:00',
  },
];

const events2024: ProspectiveEvent[] = [
  {
    title: 'راتب شهر يناير',
    titleEn: 'January Salary',
    start: '2024-01-28T00:00:00+03:00',
  },
  {
    title: 'راتب شهر فبراير',
    titleEn: 'February Salary',
    start: '2024-02-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر مارس',
    titleEn: 'March Salary',
    start: '2024-03-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر أبريل',
    titleEn: 'April Salary',
    start: '2024-04-28T00:00:00+03:00',
  },
  {
    title: 'راتب شهر مايو',
    titleEn: 'May Salary',
    start: '2024-05-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر يونيو',
    titleEn: 'June Salary',
    start: '2024-06-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر يوليو',
    titleEn: 'July Salary',
    start: '2024-07-28T00:00:00+03:00',
  },
  {
    title: 'راتب شهر أغسطس',
    titleEn: 'August Salary',
    start: '2024-08-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر سبتمبر',
    titleEn: 'September Salary',
    start: '2024-09-26T00:00:00+03:00',
  },
  {
    title: 'راتب شهر أكتوبر',
    titleEn: 'October Salary',
    start: '2024-10-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر نوفمبر',
    titleEn: 'November Salary',
    start: '2024-11-27T00:00:00+03:00',
  },
  {
    title: 'راتب شهر ديسمبر',
    titleEn: 'December Salary',
    start: '2024-12-26T00:00:00+03:00',
  },
];

const periods: ProspectivePeriod[] = [
  {
    title: '2023',
    titleEn: '2023',
    events: events2023,
  },
  {
    title: '2024',
    titleEn: '2024',
    events: events2024,
  },
];

export const govSalariesCalendar: ProspectiveCalendar = {
  title: 'الرواتب الحكومية',
  titleEn: 'Government Salaries',
  description: 'موعد صرف الرواتب',
  descriptionEn: 'Salary payment dates',
  group: CalendarGroup.SalariesAndBenefits,
  color: CalendarGroupColors[CalendarGroup.SalariesAndBenefits],
  periods,
  ...DEFAULT_GREGORIAN_IMPLEMENTATION,
};

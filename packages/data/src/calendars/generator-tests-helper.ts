import { CalendarGroup, Color } from '@prisma/client';

import { ProspectiveCalendar } from './types';
import { generateCalendar } from './generator';
import {
  DEFAULT_GREGORIAN_IMPLEMENTATION,
  DEFAULT_HIJRI_IMPLEMENTATION,
} from './helper';
import { pensionsCalendar } from './repeating';

const seasonsCalendar: ProspectiveCalendar = {
  title: 'مواسم وفصول السنة',
  titleEn: 'Seasons',
  group: CalendarGroup.SeasonsAndAstronomy,
  color: Color.DODGERBLUE,
  description: '',
  periods: [
    {
      title: '2023',
      titleEn: '2023',
      events: [
        {
          title: 'الشبط',
          titleEn: '',
          start: '2023-01-15',
        },
        {
          title: 'العقارب',
          titleEn: '',
          start: '2023-02-10',
        },
      ],
    },
  ],
  ...DEFAULT_GREGORIAN_IMPLEMENTATION,
};

const islamicCalendar: ProspectiveCalendar = {
  title: 'التقويم الإسلامي',
  titleEn: 'Islamic Calendar',
  group: CalendarGroup.Religious,
  color: Color.ANTIQUEWHITE,
  periods: [
    {
      title: '1444',
      titleEn: '1444',
      events: [
        {
          title: 'بداية رمضان',
          titleEn: 'First day of Ramadan',
          start: '1444/09/01',
        },
        { title: 'عيد الفطر', titleEn: 'Eid al-Fitr', start: '1444/10/01' },
      ],
    },
  ],
  ...DEFAULT_HIJRI_IMPLEMENTATION,
};

export function generateSeasonsCalendar(upToYear: number) {
  return generateCalendar(seasonsCalendar, upToYear);
}

export function generateIslamicCalendar(upToYear: number) {
  return generateCalendar(islamicCalendar, upToYear);
}

export function generatePensionsCalendar(upToYear: number) {
  return generateCalendar(pensionsCalendar, upToYear);
}

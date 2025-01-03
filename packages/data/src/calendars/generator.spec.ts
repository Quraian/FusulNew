import { Prisma } from '@prisma/client';

import {
  generateIslamicCalendar,
  generateSeasonsCalendar,
  generatePensionsCalendar,
} from './generator-tests-helper';

const expectedIslamicCalendar1444: Prisma.CalendarUncheckedCreateInput = {
  title: 'التقويم الإسلامي',
  titleEn: 'Islamic Calendar',
  group: 'Religious',
  color: 'ANTIQUEWHITE',
  periods: {
    create: [
      {
        events: {
          create: [
            {
              title: 'بداية رمضان',
              titleEn: 'First day of Ramadan',
              start: '2023-03-22T21:00:00.000Z',
            },
            {
              title: 'عيد الفطر',
              titleEn: 'Eid al-Fitr',
              start: '2023-04-20T21:00:00.000Z',
            },
          ],
        },
        title: '1444',
        titleEn: '1444',
      },
    ],
  },
};

const expectedIslamicCalendars1445: Prisma.CalendarUncheckedCreateInput = {
  title: 'التقويم الإسلامي',
  titleEn: 'Islamic Calendar',
  group: 'Religious',
  color: 'ANTIQUEWHITE',
  periods: {
    create: [
      {
        events: {
          create: [
            {
              title: 'بداية رمضان',
              titleEn: 'First day of Ramadan',
              start: '2023-03-22T21:00:00.000Z',
            },
            {
              title: 'عيد الفطر',
              titleEn: 'Eid al-Fitr',
              start: '2023-04-20T21:00:00.000Z',
            },
          ],
        },
        title: '1444',
        titleEn: '1444',
      },
      {
        events: {
          create: [
            {
              title: 'بداية رمضان',
              titleEn: 'First day of Ramadan',
              start: '2024-03-10T21:00:00.000Z',
            },
            {
              title: 'عيد الفطر',
              titleEn: 'Eid al-Fitr',
              start: '2024-04-09T21:00:00.000Z',
            },
          ],
        },
        title: '1445',
        titleEn: '1445',
      },
    ],
  },
};

const expectedSeasonsCalendars2023: Prisma.CalendarUncheckedCreateInput = {
  title: 'مواسم وفصول السنة',
  titleEn: 'Seasons',
  group: 'SeasonsAndAstronomy',
  color: 'DODGERBLUE',
  description: '',
  periods: {
    create: [
      {
        title: '2023',
        titleEn: '2023',
        events: {
          create: [
            { title: 'الشبط', titleEn: '', start: '2023-01-14T21:00:00.000Z' },
            {
              title: 'العقارب',
              titleEn: '',
              start: '2023-02-09T21:00:00.000Z',
            },
          ],
        },
      },
    ],
  },
};

const expectedSeasonsCalendars2024: Prisma.CalendarUncheckedCreateInput = {
  title: 'مواسم وفصول السنة',
  titleEn: 'Seasons',
  group: 'SeasonsAndAstronomy',
  color: 'DODGERBLUE',
  description: '',
  periods: {
    create: [
      {
        title: '2023',
        titleEn: '2023',
        events: {
          create: [
            { title: 'الشبط', titleEn: '', start: '2023-01-14T21:00:00.000Z' },
            {
              title: 'العقارب',
              titleEn: '',
              start: '2023-02-09T21:00:00.000Z',
            },
          ],
        },
      },
      {
        title: '2024',
        titleEn: '2024',
        events: {
          create: [
            { title: 'الشبط', titleEn: '', start: '2024-01-14T21:00:00.000Z' },
            {
              title: 'العقارب',
              titleEn: '',
              start: '2024-02-09T21:00:00.000Z',
            },
          ],
        },
      },
    ],
  },
};

const expectedConditionalCalendarDate: Prisma.CalendarUncheckedCreateInput = {
  group: 'SalariesAndBenefits',
  title: 'معاشات التقاعد والتأمينات',
  titleEn: 'Pensions',
  description: '​موعد صرف معاشات التقاعد المدني والعسكري والتأمينات الإجتماعية',
  descriptionEn: 'Pensions',
  color: 'DARKVIOLET',
  periods: {
    create: [
      {
        title: '2024',
        titleEn: '2024',
        events: {
          create: [
            {
              title: 'معاش تقاعد شهر مايو',
              titleEn: 'May Pension',
              start: '2024-04-30T21:00:00.000Z',
            },
            {
              title: 'معاش تقاعد شهر يونيو',
              titleEn: 'June Pension',
              start: '2024-05-29T21:00:00.000Z',
            },
            {
              title: 'معاش تقاعد شهر يوليو',
              titleEn: 'July Pension',
              start: '2024-06-30T21:00:00.000Z',
            },
            {
              title: 'معاش تقاعد شهر أغسطس',
              titleEn: 'August Pension',
              start: '2024-07-31T21:00:00.000Z',
            },
            {
              title: 'معاش تقاعد شهر سبتمبر',
              titleEn: 'September Pension',
              start: '2024-08-31T21:00:00.000Z',
            },
            {
              title: 'معاش تقاعد شهر أكتوبر',
              titleEn: 'October Pension',
              start: '2024-09-30T21:00:00.000Z',
            },
            {
              title: 'معاش تقاعد شهر نوفمبر',
              titleEn: 'November Pension',
              start: '2024-10-30T21:00:00.000Z',
            },
            {
              title: 'معاش تقاعد شهر ديسمبر',
              titleEn: 'December Pension',
              start: '2024-11-30T21:00:00.000Z',
            },
          ],
        },
      },
    ],
  },
};

describe('Calendars generator', () => {
  describe('Islamic Calendar', () => {
    test.each<{ year: number; expected: Prisma.CalendarUncheckedCreateInput }>([
      { year: 1444, expected: expectedIslamicCalendar1444 },
      { year: 1445, expected: expectedIslamicCalendars1445 },
    ])('should return expected calendars', ({ year, expected }) => {
      const islamic = generateIslamicCalendar(year);

      expect(islamic).toStrictEqual(expected);
    });
  });

  describe('Seasons Calendar', () => {
    test.each<{ year: number; expected: Prisma.CalendarUncheckedCreateInput }>([
      { year: 2023, expected: expectedSeasonsCalendars2023 },
      { year: 2024, expected: expectedSeasonsCalendars2024 },
    ])('should return expected calendars', ({ year, expected }) => {
      const seasons = generateSeasonsCalendar(year);

      expect(seasons).toStrictEqual(expected);
    });
  });

  it('Conditional Calendar (Repeating x event cannot fall on weekend)', () => {
    const seasons = generatePensionsCalendar(2024);

    expect(seasons).toStrictEqual(expectedConditionalCalendarDate);
  });
});

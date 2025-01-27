import { describe, expect, test } from 'vitest';

import { EventsByDateViewModel, Language } from '@fusul/common';

import { renderWithProviders } from '../../test-utils';
import { buildUserState } from '../../store';
import { EventListItem } from '../EventListItem';

const list: EventsByDateViewModel = {
  startFormatted: 'May 28',
  startFormattedInHijri: '٢٨ مايو',
  weekday: 'الأثنين',
  firstInTheFuture: false,
  events: [
    {
      id: 84,
      title: 'الشرطين',
      titleEn: '',
      description: 'يميل الطقس فيه إلى الدفء وتكثر فيه العواصف وبه أمطار خفيفة',
      start: '2023-05-10T21:00:00.000Z',
      end: null,
      periodId: 6,
      color: 'DODGERBLUE',
    },
    {
      id: 85,
      title: 'البطين',
      titleEn: '',
      description: 'بدء مربعانية القيظ وزيادة الحرارة ويبدأ جفاف العشب',
      start: '2023-05-24T21:00:00.000Z',
      end: null,
      periodId: 6,
      color: 'DODGERBLUE',
    },
    {
      id: 33,
      title: 'إجازة نهاية أسبوع مطولة',
      titleEn: 'Long weekend:',
      description: '',
      start: '2023-05-27T21:00:00.000Z',
      end: null,
      periodId: 2,
      color: 'DODGERBLUE',
    },
    {
      id: 54,
      title: 'راتب شهر مايو',
      titleEn: 'May Salary',
      start: '2023-05-27T21:00:00.000Z',
      end: null,
      periodId: 4,
      color: 'DODGERBLUE',
    },
  ],
};

describe('RemainingView', () => {
  test.each([
    { language: 'en', days: -4, weeks: 0, months: 0, expected: /4D ago/i },
    { language: 'ar', days: -4, weeks: 0, months: 0, expected: 'منذ 4 أيام' },

    { language: 'en', days: -1, weeks: 0, months: 0, expected: /yesterday/i },
    { language: 'ar', days: -1, weeks: 0, months: 0, expected: /يوم الأمس/i },

    { language: 'en', days: 0, weeks: 0, months: 0, expected: /today/i },
    { language: 'ar', days: 0, weeks: 0, months: 0, expected: 'اليوم' },

    { language: 'en', days: 1, weeks: 0, months: 0, expected: /tomorrow/i },
    { language: 'ar', days: 1, weeks: 0, months: 0, expected: 'غداً' },

    { language: 'en', days: 5, weeks: 0, months: 0, expected: /5D/i },
    { language: 'ar', days: 5, weeks: 0, months: 0, expected: '5 أيام' },

    { language: 'en', days: 4, weeks: 3, months: 0, expected: /3W 4D/i },
    {
      language: 'ar',
      days: 4,
      weeks: 3,
      months: 0,
      expected: '3 أسابيع و4 أيام',
    },

    { language: 'en', days: 1, weeks: 0, months: 3, expected: /3M 1D/i },
    { language: 'ar', days: 1, weeks: 0, months: 3, expected: '3 أشهر ويوم' },
  ])(
    'should show proper remaining days',
    ({ language, days, weeks, months, expected }) => {
      const { getByText } = renderWithProviders(
        <EventListItem {...list} remaining={{ days, weeks, months }} />,
        {
          preloadedState: {
            user: buildUserState({ language: language as Language }),
          },
        }
      );

      expect(getByText(expected)).toBeInTheDocument();
    }
  );
});

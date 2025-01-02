import { DateTime } from 'luxon';

import {
  formatDate,
  calculateRemaining,
  isThisYear,
  convertHijriToGregorian,
  setYearHijri,
} from './date-time-utilities';
import { RemainingDuration } from '../types';

const SAMPLE_DATE_MARCH_11 = new Date('2023-03-11T21:00:00.000Z');
const SAMPLE_DATE_JULY_27 = new Date('2023-07-27T21:00:00.000Z');

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(SAMPLE_DATE_MARCH_11));
});

afterAll(() => {
  jest.useRealTimers();
});

const OPTIONS = {
  inHijri: false,
  locale: 'en-SA',
  formatOpts: DateTime.DATE_MED_WITH_WEEKDAY,
};

describe('Date Time Utilities', () => {
  describe('formatDate()', () => {
    test.each([
      {
        date: SAMPLE_DATE_MARCH_11,
        formatOpts: OPTIONS,
        expected: 'Sun, Mar 12, 2023',
      },
      {
        date: SAMPLE_DATE_MARCH_11,
        formatOpts: { ...OPTIONS, inHijri: true },
        expected: 'Sun, Sha. 20, 1444 AH',
      },
      {
        date: SAMPLE_DATE_MARCH_11,
        formatOpts: { ...OPTIONS, locale: 'ar-SA' },
        expected: 'الأحد، ١٢ مارس ٢٠٢٣',
      },
      {
        date: SAMPLE_DATE_MARCH_11,
        formatOpts: { ...OPTIONS, inHijri: true, locale: 'ar-SA' },
        expected: 'الأحد، ٢٠ شعبان ١٤٤٤ هـ',
      },
    ])('should return proper format', ({ date, formatOpts, expected }) => {
      expect(formatDate(date, formatOpts)).toEqual(expected);
    });
  });

  describe('isThisYear', () => {
    it('returns not in the same year for given hijri date', () => {
      expect(isThisYear(SAMPLE_DATE_JULY_27, true)).toEqual(false);
    });

    it('returns in the same year for given gregorian date', () => {
      expect(isThisYear(SAMPLE_DATE_JULY_27)).toEqual(true);
    });
  });

  describe('calculateRemaining()', () => {
    type RemainingOptions = 'short' | 'extended';

    test.each([
      {
        date: '2023-03-10T21:00:00.000Z',
        options: 'short' as RemainingOptions,
        expected: { months: 0, weeks: 0, days: -1 },
      },
      {
        date: '2023-03-11T21:00:00.000Z',
        options: 'short' as RemainingOptions,
        expected: { months: 0, weeks: 0, days: 0 },
      },
      {
        date: '2023-03-15T21:00:00.000Z',
        options: 'short' as RemainingOptions,
        expected: { months: 0, weeks: 0, days: 4 },
      },
      {
        date: '2023-03-22T21:00:00.000Z',
        options: 'extended' as RemainingOptions,
        expected: { months: 0, weeks: 1, days: 4 },
      },
      {
        date: '2023-05-27T21:00:00.000Z',
        options: 'extended' as RemainingOptions,
        expected: { months: 2, weeks: 0, days: 16 },
      },
    ])(
      'should return correct remaining',
      ({
        date,
        options,
        expected,
      }: {
        date: string;
        options: RemainingOptions;
        expected: RemainingDuration;
      }) => {
        expect(calculateRemaining(new Date(date), options)).toStrictEqual(
          expected
        );
      }
    );
  });

  describe('convertHijriToGregorian', () => {
    it('converts Hijri to Gregorian properly', () => {
      expect(convertHijriToGregorian('1444/01/10')).toEqual(
        new Date('2022-08-07T21:00:00.000Z')
      );
    });
  });

  describe('setYearHijri', () => {
    it('converts Hijri to Gregorian properly', () => {
      expect(setYearHijri('1444/01/10', 1445)).toEqual(SAMPLE_DATE_JULY_27);
    });
  });
});

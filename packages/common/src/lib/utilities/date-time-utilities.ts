import { DateTime, DurationObjectUnits, DurationUnits } from 'luxon';
import uq from '@umalqura/core';

import { RemainingDuration } from '../types';

const UMALQURA = 'islamic-umalqura';

export function isToday(date: Date): boolean {
  return DateTime.fromJSDate(date).hasSame(DateTime.now(), 'day');
}

export function isInTheFuture(date: Date): boolean {
  return DateTime.fromJSDate(date) > DateTime.now();
}

export function isInThePast(date: Date): boolean {
  return DateTime.fromJSDate(date) < DateTime.now();
}

/*
 * Checks if the dates are in the same year.
 * Keep in mind the for hijri it will convert to hijri then compare the years
 *
 */
export function isThisYear(date: Date, isHijri = false): boolean {
  const year = DateTime.fromJSDate(date)
    .reconfigure({ outputCalendar: isHijri ? UMALQURA : undefined })
    .toFormat('yyyy');

  const thisYear = DateTime.now()
    .reconfigure({ outputCalendar: isHijri ? UMALQURA : undefined })
    .toFormat('yyyy');

  return year === thisYear;
}

export function parseDate(value: string): Date {
  return DateTime.fromISO(value).toUTC().toJSDate();
}

export function splitHijriDate(value: string): [string, string, string] {
  const regex = /^(\d{4})\/(\d{2})\/(\d{2})$/;
  const match = value.match(regex);

  if (match) {
    return [match[1], match[2], match[3]];
  }

  throw Error(`Unable to parse ${value} as Hijri date`);
}

export function convertHijriToGregorian(value: string): Date {
  const [year, month, day] = splitHijriDate(value);

  return uq(Number.parseInt(year), Number.parseInt(month), Number.parseInt(day))
    .date;
}

export function toTimeOnly(date: Date, locale: string): string {
  return DateTime.fromJSDate(date).setLocale(locale).toFormat('h:mm');
}

export function setYear(date: Date, year: number): Date {
  return DateTime.fromJSDate(date).set({ year }).toJSDate();
}

export function getWeekdayDay(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
}

type FormattingOptions = {
  inHijri: boolean;
  locale?: string;
  formatOpts?: Intl.DateTimeFormatOptions;
};

export function formatDate(
  date: Date,
  { inHijri, locale, formatOpts }: FormattingOptions = { inHijri: false }
) {
  const formatted = new Intl.DateTimeFormat(locale, {
    ...(formatOpts ? {} : { dateStyle: 'long' }),
    numberingSystem: locale === 'ar-SA' ? 'arab' : 'native',
    calendar: inHijri ? UMALQURA : 'gregory',
    ...formatOpts,
  }).format(date);

  // To fix the date conversion issue in Android Chrome, see: https://bugs.chromium.org/p/chromium/issues/detail?id=1350168
  if (locale?.startsWith('en') && inHijri) {
    const months = [
      ['January', 'Muharram'],
      ['February', 'Safar'],
      ['March', 'Rabi al-Awwal'],
      ['April', 'Rabi al-Thani'],
      ['May', 'Jumada al-Awwal'],
      ['June', 'Jumada al-Thani'],
      ['July', 'Rajab'],
      ['August', 'Shaban'],
      ['September', 'Ramadan'],
      ['October', 'Shawwal'],
      ['November', 'Dhu al-Qadah'],
      ['December', 'Dhu al-Hijjah'],
    ];

    // Replace 'September 6, 1444 BC' to 'Ramadan 6, 1444 AH'
    return months
      .reduce((acc, [g, h]) => {
        return acc.replace(g, h);
      }, formatted)
      .replace('AC', 'AH')
      .replace('BC', 'AH');
  }

  return formatted;
}

export function getDifference(
  date?: Date | null,
  other?: Date | null
): DurationObjectUnits | undefined | null {
  return (
    date &&
    other &&
    DateTime.fromJSDate(date)
      .diff(DateTime.fromJSDate(other), ['hours', 'minutes'])
      .toObject()
  );
}

function calculateDateDiff(date: Date, duration: DurationUnits) {
  return DateTime.fromJSDate(date)
    .startOf('day')
    .diff(DateTime.now().startOf('day'), duration)
    .toObject();
}

export function calculateRemaining(
  date: Date,
  options: 'short' | 'extended'
): RemainingDuration {
  if (options === 'short') {
    return {
      days: Math.ceil(calculateDateDiff(date, 'days').days || 0),
      weeks: 0,
      months: 0,
    };
  }

  const {
    months: allMonths,
    weeks: allWeeks,
    days: allDays,
  } = calculateDateDiff(date, ['days', 'weeks', 'months']);
  const containsAll = allMonths && allWeeks && allDays;

  const {
    months: m,
    weeks: w,
    days: d,
  } = calculateDateDiff(
    date,
    containsAll ? ['days', 'months'] : ['days', 'weeks', 'months']
  );

  const months = m || 0;
  const weeks = w ? Math.ceil(w) : 0;
  const days = d ? Math.ceil(d) : 0;

  return { months, weeks, days };
}

export function setYearHijri(date: string, year: number) {
  const [y, m, d] = splitHijriDate(date);
  const originalYear = Number.parseInt(y);

  return convertHijriToGregorian(
    `${originalYear + (year - originalYear)}/${m}/${d}`
  );
}

export function getReamingDetails({ months, weeks, days }: RemainingDuration) {
  return {
    isYesterday: months === 0 && weeks === 0 && days === -1,
    isToday: months === 0 && weeks === 0 && days === 0,
    isTomorrow: months === 0 && weeks === 0 && days === 1,
    isInThePast: months < 0 || weeks < 0 || days < 0,
    containsMonths: months !== 0,
    containsWeeks: weeks !== 0,
    containsDays: days !== 0,
  };
}

function isWeekend(date: Date): boolean {
  return (
    DateTime.fromJSDate(date).weekday === 5 ||
    DateTime.fromJSDate(date).weekday === 6
  );
}
function setOnThursday(date: Date): Date {
  return DateTime.fromJSDate(date).set({ weekday: 4 }).toJSDate();
}

export function setOnThursdayIfFallsOnWeekend(date: Date) {
  if (isWeekend(date)) {
    return setOnThursday(date);
  }

  return date;
}

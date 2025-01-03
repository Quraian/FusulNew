import { CalendarGroup, Color } from '@prisma/client';

import {
  parseDate,
  setYear,
  convertHijriToGregorian,
  splitHijriDate,
  setYearHijri,
} from '@fusul/common';

export const CalendarGroupColors = {
  [CalendarGroup.SalariesAndBenefits]: Color.DARKVIOLET,
  [CalendarGroup.SeasonsAndAstronomy]: Color.DODGERBLUE,
  [CalendarGroup.Religious]: Color.PERU,
};

export const DEFAULT_GREGORIAN_IMPLEMENTATION = {
  parseDate: parseDate,
  getFullYear: (date: string) => parseDate(date).getFullYear(),
  setYear: (date: string, year: number) => setYear(parseDate(date), year),
};

export const DEFAULT_HIJRI_IMPLEMENTATION = {
  parseDate: convertHijriToGregorian,
  getFullYear: (date: string) => Number.parseInt(splitHijriDate(date)[0]),
  setYear: setYearHijri,
};

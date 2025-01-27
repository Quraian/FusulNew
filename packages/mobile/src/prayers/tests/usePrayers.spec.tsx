import { beforeEach, afterAll, describe, test, expect, vi } from 'vitest';

import { Language } from '@fusul/common';
import { usePrayers } from '../usePrayers';
import { renderHookWithProviders } from '../../test-utils';
import { buildUserState } from '../../store';
import { expected } from './expected';

beforeEach(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

export const TEN_52_AM_UTC = '2023-03-12T10:52:57.532Z';
export const ELEVEN_52_AM_UTC = '2023-03-12T11:52:57.532Z';
export const ELEVEN_27_AM_UTC = '2023-03-12T11:27:57.532Z';
export const NINE_5_PM_UTC = '2023-03-12T21:05:57.532Z';

type LangKey = keyof typeof expected;
type PrayersKey = keyof (typeof expected)[LangKey];

describe('usePrayers', () => {
  test.each([
    {
      date: TEN_52_AM_UTC,
      nextName: 'Asr',
      nextTime: '3:28',
      remaining: '1h 35m',
      language: 'en',
      expectedPath: TEN_52_AM_UTC,
    },
    {
      date: TEN_52_AM_UTC,
      nextName: 'العصر',
      nextTime: '٣:٢٨',
      remaining: '١س ٣٥د',
      language: 'ar',
      expectedPath: TEN_52_AM_UTC,
    },
    {
      date: ELEVEN_27_AM_UTC,
      nextName: 'Asr',
      nextTime: '3:28',
      remaining: '1h',
      language: 'en',
      expectedPath: ELEVEN_27_AM_UTC,
    },
    {
      date: ELEVEN_52_AM_UTC,
      nextName: 'Asr',
      nextTime: '3:28',
      remaining: '35m',
      language: 'en',
      expectedPath: ELEVEN_52_AM_UTC,
    },
    {
      date: NINE_5_PM_UTC,
      nextName: 'Fajr',
      nextTime: '4:47',
      remaining: '4h 41m',
      language: 'en',
      expectedPath: NINE_5_PM_UTC,
    },
  ])(
    'should format date properly',
    ({ date, nextName, nextTime, remaining, language, expectedPath }) => {
      vi.setSystemTime(new Date(date));

      const {
        result: {
          current: { next, prayers },
        },
      } = renderHookWithProviders(() => usePrayers(), {
        preloadedState: {
          user: buildUserState({
            language: language as Language,
            location: {
              status: 'succeeded',
              result: { latitude: 24.7125657, longitude: 46.6764285 },
            },
          }),
        },
      });

      expect(next?.name).toBe(nextName);
      expect(next?.time).toBe(nextTime);
      expect(next?.remaining).toBe(remaining);
      expect(expected[language as LangKey][expectedPath as PrayersKey]).toEqual(
        prayers
      );
    }
  );
});

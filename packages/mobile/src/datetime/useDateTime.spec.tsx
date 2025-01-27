import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { useDateTime } from './useDateTime';
import { renderHookWithProviders } from '../test-utils';
import { buildUserState } from '../store';

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2023-03-12T10:52:57.532Z'));
});

afterAll(() => {
  vi.useRealTimers();
});

describe('useDateTime', () => {
  it('should format date properly', () => {
    const { result } = renderHookWithProviders(() => useDateTime());

    expect(
      result.current.getTimeFromNow(new Date('2023-03-12T11:32:57.532Z'))
    ).toBe('٤٠د');
    expect(
      result.current.getTimeFromNow(new Date('2023-03-12T11:52:57.532Z'))
    ).toBe('١س');
    expect(
      result.current.getTimeFromNow(new Date('2023-03-12T13:52:57.532Z'))
    ).toBe('٣س');
    expect(result.current.dateFormatted).toBe('الأحد، ١٢ مارس ٢٠٢٣');
    expect(result.current.dateFormattedHijri).toBe('٢٠ شعبان ١٤٤٤ هـ');
  });

  it('should format date properly (en)', () => {
    const { result } = renderHookWithProviders(() => useDateTime(), {
      preloadedState: {
        user: buildUserState({ language: 'en' }),
      },
    });

    expect(result.current.dateFormatted).toBe('Sunday, March 12, 2023');
    expect(result.current.dateFormattedHijri).toBe('Shaʻban 20, 1444 AH');
    expect(
      result.current.getTimeFromNow(new Date('2023-03-12T11:32:57.532Z'))
    ).toBe('40m');
    expect(
      result.current.getTimeFromNow(new Date('2023-03-12T11:52:57.532Z'))
    ).toBe('1h');
    expect(
      result.current.getTimeFromNow(new Date('2023-03-12T13:52:57.532Z'))
    ).toBe('3h');
  });
});

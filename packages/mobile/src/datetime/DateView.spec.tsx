import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { buildUserState } from '../store';
import { renderWithProviders } from '../test-utils';
import { DateView } from './DateView';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2023-03-12T10:52:57.532Z'));
});

afterAll(() => {
  vi.useRealTimers();
});

describe('DateView', () => {
  it('should format date properly', () => {
    const { getByText } = renderWithProviders(<DateView />, {
      preloadedState: {
        user: buildUserState({ language: 'en' }),
      },
    });

    const dateEl = getByText('Sunday, March 12, 2023');
    const dateHijriEl = getByText('Shaʻban 20, 1444 AH');

    expect(dateEl).toBeInTheDocument();
    expect(dateHijriEl).toBeInTheDocument();
  });

  it('should format date properly (ar)', () => {
    const { getByText } = renderWithProviders(<DateView />, {
      preloadedState: {
        user: buildUserState({ language: 'ar' }),
      },
    });

    const dateEl = getByText('الأحد، ١٢ مارس ٢٠٢٣');
    const dateHijriEl = getByText('٢٠ شعبان ١٤٤٤ هـ');

    expect(dateEl).toBeInTheDocument();
    expect(dateHijriEl).toBeInTheDocument();
  });
});

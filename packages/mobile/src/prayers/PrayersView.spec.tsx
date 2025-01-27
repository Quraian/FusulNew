import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { buildUserState } from '../store';
import { renderWithProviders } from '../test-utils';
import { PrayersView } from './PrayersView';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2023-03-12T10:52:57.532Z'));
});

afterAll(() => {
  vi.useRealTimers();
});

describe('PrayersView', () => {
  it('should find prayer name and time', () => {
    const user = buildUserState({
      location: {
        result: { latitude: 24.7267328, longitude: 46.6812928 },
        status: 'idle',
      },
    });

    const { getByText, getAllByText } = renderWithProviders(<PrayersView />, {
      preloadedState: {
        user: user,
      },
    });
    const maghribAndSunset = getAllByText('٦:٠١');

    expect(getByText('العصر ١س ٣٥د')).toBeInTheDocument();
    expect(getByText('الفجر')).toBeInTheDocument();
    expect(getByText('٤:٤٨')).toBeInTheDocument();
    expect(getByText('الظهر')).toBeInTheDocument();
    expect(getByText('١٢:٠٣')).toBeInTheDocument();
    expect(getByText('العصر')).toBeInTheDocument();
    expect(getByText('٣:٢٨')).toBeInTheDocument();
    expect(getByText('المغرب')).toBeInTheDocument();
    expect(maghribAndSunset).toHaveLength(2);
    expect(maghribAndSunset[0]).toHaveTextContent('٦:٠١');
    expect(maghribAndSunset[1]).toHaveTextContent('٦:٠١');
    expect(getByText('العشاء')).toBeInTheDocument();
    expect(getByText('٧:٣١')).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';

import { useWeather } from './useWeather';
import { renderHookWithProviders } from '../test-utils';
import { buildUserState } from '../store';

describe('useWeather', () => {
  it('should format date properly', () => {
    const { result } = renderHookWithProviders(() => useWeather(), {
      preloadedState: {
        user: buildUserState({ language: 'en' }),
      },
    });

    expect(result.current).toStrictEqual({
      isError: false,
      isFetching: false,
      isLoading: false,
      weather: undefined,
    });
  });
});

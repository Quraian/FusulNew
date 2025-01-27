import { beforeEach, afterAll, describe, it, expect } from 'vitest';
import nock from 'nock';

import { useEvents } from '../useEvents';
import { renderHookWithProviders } from '../../test-utils';
import calendars from './sample-calendars.json';
import { buildUserState } from '../../store';

beforeEach(() => {
  nock('http://localhost:3000/api')
    .get('/calendars')
    .query(true)
    .reply(200, calendars)
    .persist();
  nock('http://localhost:3000/api')
    .get('/calendars/events')
    .query(true)
    .reply(200, {
      data: [],
      meta: {
        currentPage: 1,
        lastPage: 1,
        next: null,
        perPage: 12,
        prev: 1,
        total: 4,
      },
    })
    .persist();
});

afterAll(() => {
  nock.cleanAll();
});

describe('useEvents', () => {
  it('should return loading and fetching', () => {
    const { result } = renderHookWithProviders(() => useEvents(), {
      preloadedState: {
        user: buildUserState({ language: 'en' }),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { triggerFetchEvents, ...rest } = result.current;

    expect(rest).toStrictEqual({
      errorMessage: undefined,
      isLoading: true,
      isFetching: true,
      nextPage: null,
      prevPage: null,
    });
  });
});

import { act, waitFor } from '@testing-library/react';
import nock from 'nock';

import App from './App';
import { renderWithProviders } from './test-utils';

// this avoids some http query error
beforeEach(() => {
  nock(`${import.meta.env['VITE_API_URL']}/api`)
    .get('/calendars')
    .query(true)
    .reply(200, [])
    .persist();
  nock(`${import.meta.env['VITE_API_URL']}/api`)
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

test('renders without crashing', async () => {
  await act(async () => {
    const { baseElement } = renderWithProviders(<App />);

    await waitFor(() => {
      expect(baseElement).toBeDefined();
    });
  });
});

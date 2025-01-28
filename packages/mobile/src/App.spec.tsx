import { act, waitFor } from '@testing-library/react';
import nock from 'nock';

import App from './App';
import { renderWithProviders } from './test-utils';

// this avoids some http query error
beforeEach(() => {
  nock(import.meta.env['VITE_API_URL']).persist().get(/.*/).reply(200);
});

test('renders without crashing', async () => {
  await act(async () => {
    const { baseElement } = renderWithProviders(<App />);

    await waitFor(() => {
      expect(baseElement).toBeDefined();
    });
  });
});

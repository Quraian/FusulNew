import { beforeEach, expect, test } from 'vitest';
import { act, waitFor } from '@testing-library/react';
import nock from 'nock';

import App from './App';
import { renderWithProviders } from './test-utils';

beforeEach(() => {
  nock('http://localhost:3000').persist().get(/.*/).reply(404);
});

test('renders without crashing', async () => {
  await act(async () => {
    const { baseElement } = renderWithProviders(<App />);

    await waitFor(() => {
      expect(baseElement).toBeDefined();
    });
  });
});

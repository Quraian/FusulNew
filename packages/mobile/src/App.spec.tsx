import { act, waitFor } from '@testing-library/react';

import App from './App';
import { renderWithProviders } from './test-utils';

test('renders without crashing', async () => {
  await act(async () => {
    const { baseElement } = renderWithProviders(<App />);

    await waitFor(() => {
      expect(baseElement).toBeDefined();
    });
  });
});

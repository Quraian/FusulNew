import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';

import App from './app';
import { setupI18n } from '@fusul/common';

describe('App', () => {
  it('should render successfully', () => {
    setupI18n();
    const { baseElement } = render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';

import { setupI18n } from '@fusul/common';
import App from './app/app';

const theme = createTheme({
  colors: {
    deepBlue: [
      '#ecfafd',
      '#dbf2f8',
      '#b1e5f1',
      '#86d8ec',
      '#67cde6',
      '#56c6e3',
      '#4bc3e3',
      '#3eacca',
      '#2f99b4',
      '#0f849e',
    ],
  },
  primaryColor: 'deepBlue',
  primaryShade: 9,
});

setupI18n();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
);

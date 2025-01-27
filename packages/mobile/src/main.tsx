import React from 'react';
import { createRoot } from 'react-dom/client';

import { setupI18n } from '@fusul/common';
import App from './App';
import { StoreProvider } from './store/StoreProvider';

setupI18n();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StoreProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider>
);

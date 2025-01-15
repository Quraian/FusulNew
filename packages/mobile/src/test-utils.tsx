import React, { PropsWithChildren } from 'react';
import { render, renderHook } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { setupI18n } from '@fusul/common';
import { AppStore, RootState, setupStore } from './store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

function getWrapper(store: ReturnType<typeof setupStore>) {
  return function ({ children }: PropsWithChildren<object>) {
    return <Provider store={store}>{children}</Provider>;
  };
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = undefined,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  setupI18n(store.getState().user.preferences.language);

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: getWrapper(store), ...renderOptions }),
  };
}

export function renderHookWithProviders<Result, Props>(
  render: (initialProps: Props) => Result,
  {
    preloadedState = undefined,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  setupI18n(store.getState().user.preferences.language);

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...renderHook(render, { wrapper: getWrapper(store), ...renderOptions }),
  };
}

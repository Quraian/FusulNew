import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  addListener,
  ListenerEffectAPI,
  TypedAddListener,
  TypedStartListening,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { api } from '../common/services/api';
import { userSlice } from './slices/userSlice';
import { eventSlice } from './slices/eventSlice';
import { persistMiddleware } from './persistMiddleware';
import { calendarSlice } from './slices/calendarSlice';
import { isProduction } from '@fusul/common';
import { uiSlice } from './slices/uiSlice';

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

const rootReducer = combineReducers({
  [uiSlice.name]: uiSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [eventSlice.name]: eventSlice.reducer,
  [calendarSlice.name]: calendarSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    devTools: !isProduction(),
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddlewareInstance.middleware)
        .concat(api.middleware)
        .concat(persistMiddleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddlewareInstance.startListening as AppStartListening;
export const addAppListener = addListener as AppAddListener;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from './slices/userSlice';
export * from './slices/eventSlice';
export * from './selectors';

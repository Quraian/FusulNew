import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { IonSpinner } from '@ionic/react';
import { useImmer } from 'use-immer';

import { RootState, eventsReceived, getCurrentLocation, setupStore } from '.';
import {
  areEventDataValid,
  loadCalendars,
  loadEvents,
  loadUserState,
  invalidateCalendarsAndEventsCache,
} from '../common';
import { calendarsReceived } from './slices/calendarSlice';

type StoreStatus = {
  isReady: boolean;
  preloadedState: Partial<RootState>;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [preloaded, setPreloaded] = useImmer<StoreStatus>({
    isReady: false,
    preloadedState: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const userState = await loadUserState();

      setPreloaded((draft) => {
        draft.preloadedState.user = userState;
        draft.isReady = true;
      });
    };

    fetchData().catch(() =>
      setPreloaded((draft) => {
        draft.isReady = true;
      })
    );
  }, [setPreloaded]);

  if (preloaded.isReady) {
    const store = setupStore(preloaded.preloadedState);

    setupListeners(store.dispatch);
    store.dispatch(getCurrentLocation());

    loadEvents().then((events) => {
      //** If any two events have the same start dates and titles then something is wrong and cache need to be reset */
      if (!areEventDataValid(events.data)) {
        console.error(
          'Events have some duplicate data, resetting calendar and events data'
        );
        invalidateCalendarsAndEventsCache();

        return;
      }
      store.dispatch(
        eventsReceived({
          events,
          fromApi: false,
        })
      );
    });

    loadCalendars().then((cached) => {
      store.dispatch(calendarsReceived(cached));
    });

    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <IonSpinner style={{ display: 'block', margin: '0 auto', height: 320 }} />
  );
};

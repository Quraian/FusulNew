import { Middleware, isAnyOf } from '@reduxjs/toolkit';

import { persisCalendars, persisEvents, persisUserState } from '../common';
import { weatherApi } from './services/weatherApi';
import { calendarsReceived } from './slices/calendarSlice';
import { RootState } from '.';
import {
  selectUser,
  selectCalendars,
  selectEventsWithUpdatedOn,
} from './selectors';
import { eventsReceived } from './slices/eventSlice';
import {
  setLanguage,
  setCalendarOptions,
  setUserCity,
} from './slices/userSlice';

const isPersistenceRelatedAction = isAnyOf(
  setLanguage,
  setCalendarOptions,
  setUserCity,
  weatherApi.endpoints.fetchWeather.matchFulfilled
);

export const persistMiddleware: Middleware<unknown, RootState> =
  ({ getState }: { getState: () => RootState }) =>
  (next) =>
  async (action: unknown) => {
    const result = next(action);
    const state = getState();

    if (isPersistenceRelatedAction(action)) {
      await persisUserState(selectUser(state));
    } else if (calendarsReceived.match(action)) {
      await persisCalendars(selectCalendars(state));
    } else if (eventsReceived.match(action) && action.payload.fromApi) {
      // TODO: There's some bug here, the events will be persisted even if it's coming from localstorage
      const { events, meta, updateOn } = selectEventsWithUpdatedOn(state);

      await persisEvents(events, meta, updateOn);
    }

    return result;
  };

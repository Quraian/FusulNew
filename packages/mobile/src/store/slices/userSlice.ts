import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Geolocation } from '@capacitor/geolocation';
import { z } from 'zod';
import { produce } from 'immer';

import {
  City,
  CitySchema,
  DEFAULT_PREFERRED_CALENDARS_IDS,
  GeoLocationSchema,
  Language,
  LanguageSchema,
} from '@fusul/common';
import {
  AsyncGeoLocation,
  CalendarOptions,
  CalendarOptionsSchema,
  isSerializedError,
  StatusSchema,
} from '../../common';

const UserPreferencesSchema = z.object({
  language: LanguageSchema,
  calendarOptions: CalendarOptionsSchema,
});

export const UserStateSchema = z.object({
  preferences: UserPreferencesSchema,
  location: z.object({
    status: StatusSchema,
    result: z.optional(GeoLocationSchema),
    errorMessage: z.string().optional(),
  }),
  city: z.optional(CitySchema),
});

export type UserState = z.infer<typeof UserStateSchema>;

const initialState: UserState = {
  preferences: {
    language: 'ar',
    calendarOptions: {
      descriptions: 'onScroll',
      eventsCalendarSelection: 'gregorian',
      remainingDays: 'extended',
      preferredCalendars: [...DEFAULT_PREFERRED_CALENDARS_IDS],
    },
  },
  location: { result: undefined, status: 'idle' },
};

export function buildUserState({
  language = initialState.preferences.language,
  location = initialState.location,
  calendarOptions = initialState.preferences.calendarOptions,
  preferredCalendars = initialState.preferences.calendarOptions
    .preferredCalendars,
  userCity = initialState.city,
}): UserState {
  return produce(initialState, (draft) => {
    draft.preferences.language = language;
    draft.location = location;
    draft.preferences.calendarOptions = calendarOptions;
    draft.preferences.calendarOptions.preferredCalendars = preferredCalendars;
    draft.city = userCity;
  });
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguage({ preferences }, action: PayloadAction<Language>) {
      preferences.language = action.payload;
    },
    initializePreferredCalendars(
      { preferences },
      action: PayloadAction<number[]>
    ) {
      if (
        !preferences.calendarOptions.preferredCalendars ||
        preferences.calendarOptions.preferredCalendars.length === 0
      ) {
        preferences.calendarOptions.preferredCalendars = action.payload;
      }
    },
    setCalendarOptions(
      { preferences },
      action: PayloadAction<CalendarOptions>
    ) {
      preferences.calendarOptions = {
        ...preferences.calendarOptions,
        ...action.payload,
      };
    },
    setUserCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentLocation.pending, (state) => {
        state.location.status = 'pending';
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.location = {
          ...action.payload,
          status: 'idle',
        };
      });
  },
});

export const getCurrentLocation = createAsyncThunk(
  'users/getCurrentLocation',
  async (): Promise<AsyncGeoLocation> => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 600000,
      });
      return {
        result: { latitude, longitude },
        status: 'succeeded',
      };
    } catch (error) {
      console.error({ error });
      let errorMessage = 'Unable to get location';

      if (isSerializedError(error) && error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      return {
        result: undefined,
        errorMessage,
        status: 'failed',
      };
    }
  }
);

export const {
  setLanguage,
  setCalendarOptions,
  initializePreferredCalendars,
  setUserCity,
} = userSlice.actions;

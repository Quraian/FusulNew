import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Calendar } from '@fusul/common';
import { Status } from '../../common';

export const calendarsAdapter = createEntityAdapter<Calendar>({});

type CalendarEntityType = ReturnType<
  typeof calendarsAdapter.getInitialState
> & {
  loading: Status;
};

export const calendarSlice = createSlice({
  name: 'calendars',
  initialState: calendarsAdapter.getInitialState<CalendarEntityType>({
    ...calendarsAdapter.getInitialState(),
    loading: 'idle',
  }),
  reducers: {
    calendarsLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    calendarsReceived(state, action: PayloadAction<Calendar[]>) {
      calendarsAdapter.setMany(state, action.payload);
      state.loading = 'idle';
    },
  },
});

export const { calendarsLoading, calendarsReceived } = calendarSlice.actions;

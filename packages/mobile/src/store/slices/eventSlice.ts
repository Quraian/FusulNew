import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { CalendarEvent, EventConstants, parseDate } from '@fusul/common';
import { ListResponse, Status } from '../../common';

type EventsResponse = ListResponse<CalendarEvent>;

type EventEntityType = ReturnType<typeof eventsAdapter.getInitialState> & {
  loading: Status;
  updatedTimeStamp: number | null;
  selectedEvent: CalendarEvent | null;
} & Pick<EventsResponse, 'meta'>;

export const eventsAdapter = createEntityAdapter<CalendarEvent>({
  sortComparer: (c1, c2) =>
    parseDate(c1.start).getTime() - parseDate(c2.start).getTime(),
});

export const EVENTS_META_DEFAULT_VALUES = Object.freeze({
  currentPage: null,
  lastPage: null,
  next: null,
  prev: null,
  perPage: EventConstants.LIST_ITEMS_COUNT,
});

export const eventSlice = createSlice({
  name: 'events',
  initialState: eventsAdapter.getInitialState<EventEntityType>({
    ...eventsAdapter.getInitialState(),
    loading: 'idle',
    updatedTimeStamp: null,
    selectedEvent: null,
    meta: EVENTS_META_DEFAULT_VALUES,
  }),
  reducers: {
    eventsLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    currentPageReceived(
      state,
      { payload: currentPage }: PayloadAction<number>
    ) {
      state.meta.currentPage = currentPage;
    },
    eventsReceived(
      state,
      {
        payload: { events, fromApi },
      }: PayloadAction<{ events: EventsResponse; fromApi: boolean }>
    ) {
      eventsAdapter.setMany(state, events.data);
      state.meta = events.meta;

      if (events.data.length > 0 && fromApi) {
        state.updatedTimeStamp = Date.now();
      }
      state.loading = 'idle';
    },
    eventClicked(state, { payload: event }: PayloadAction<CalendarEvent>) {
      state.selectedEvent = event;
    },
    eventInFocusDismissed(state) {
      state.selectedEvent = null;
    },
  },
});

export const {
  eventsLoading,
  currentPageReceived,
  eventsReceived,
  eventClicked,
  eventInFocusDismissed,
} = eventSlice.actions;

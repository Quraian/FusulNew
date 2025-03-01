import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { z } from 'zod';

import {
  Calendar,
  CalendarEventsPaginated,
  CalendarEventsPaginatedSchema,
  CalendarSchema,
  DEFAULT_PREFERRED_CALENDARS_IDS,
  EventConstants,
} from '@fusul/common';
import { api } from '../../common';
import { eventsReceived, initializePreferredCalendars } from '..';
import { ListQuery } from '../../common/generics';
import { calendarsReceived } from '../slices/calendarSlice';

export const calendarsApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchCalendars: build.query<Calendar[], boolean>({
      query: () => ({
        url: 'calendars',
      }),
      onQueryStarted: async (_id, { dispatch, queryFulfilled }) => {
        // TODO: this could throw unhandled error, test by stopping docker
        try {
          await queryFulfilled.then(({ data }) => {
            const preferredCalendars = data
              .filter((c) => DEFAULT_PREFERRED_CALENDARS_IDS.includes(c.id))
              .map((c) => c.id)
              .flat();

            dispatch(initializePreferredCalendars(preferredCalendars));
            dispatch(calendarsReceived(data));
          });
        } catch (error) {
          console.log('Query failed:', error);
        }
      },
      transformResponse: (response) => CalendarSchema.array().parse(response),
      transformErrorResponse: (response) => response,
    }),
    fetchEvents: build.query<CalendarEventsPaginated, ListQuery>({
      // query: (query) => ({
      //   url: 'calendars/events',
      //   params: {
      //     perPage: query?.perPage || EventConstants.LIST_ITEMS_COUNT,
      //     page: query?.page,
      //     calendars: query?.filter,
      //   },
      // }),
      async queryFn(arg, _queryApi, _extraOptions, fetch) {
        // get a random user
        // const randomResult = await fetch('users/random')
        // if (randomResult.error)
        //   return { error: randomResult.error as FetchBaseQueryError }
        // const user = randomResult.data as User
        let page = arg.page;

        if (page === null) {
          const pageResult = await fetch({
            url: 'calendars/getCurrentPage',
            params: {
              perPage: arg?.perPage || EventConstants.LIST_ITEMS_COUNT,
              calendars: arg?.filter,
            },
          });
          page =
            typeof pageResult.data === 'number'
              ? pageResult.data
              : z.number().parse(pageResult.data);
        }

        const result = await fetch({
          url: 'calendars/events',
          params: {
            perPage: arg.perPage || EventConstants.LIST_ITEMS_COUNT,
            page,
            calendars: arg.filter,
          },
        });

        return result.data
          ? { data: CalendarEventsPaginatedSchema.parse(result.data) }
          : { error: result.error as FetchBaseQueryError };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(eventsReceived({ events: data, fromApi: true }));
        } catch (err) {
          console.log({ err });

          // `onError` side-effect
          // dispatch(messageCreated('Error fetching posts!'));
        }
      },
      // transformResponse: (response, _meta, _arg) => CalendarEventsPaginatedSchema.parse(response),
      // transformErrorResponse: (response, _meta, _arg) => response,
    }),
  }),
});

export const {
  useFetchCalendarsQuery,
  useFetchEventsQuery,
  useLazyFetchEventsQuery,
} = calendarsApi;

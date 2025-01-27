import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useFetchCalendarsQuery,
  useLazyFetchEventsQuery,
} from '../store/services/calendarsApi';
import {
  selectCalendarsIdsToView,
  selectEventsMetadata,
  useAppSelector,
} from '../store';
import { NetworkConstants } from '../common';
import { EventsByDateViewModel } from '@fusul/common';

export interface UseEventsViewModel {
  isLoading: boolean;
  isFetching: boolean;
  errorMessage?: string;
  eventsByDate?: EventsByDateViewModel[];
  nextPage: number | null;
  prevPage: number | null;
  triggerFetchEvents: (page?: number | null) => Promise<unknown>;
}

export function useEvents(): UseEventsViewModel {
  const { t } = useTranslation();
  const calendarsIdsToView = useAppSelector(selectCalendarsIdsToView);
  const {
    next: nextPage,
    prev: prevPage,
    currentPage,
  } = useAppSelector(selectEventsMetadata);

  const {
    isLoading: areCalendarsLoading,
    isFetching: areCalendarsFetching,
    error: calendarsFetchingError,
  } = useFetchCalendarsQuery(false, { ...NetworkConstants });

  const [fetchEvents, { isLoading, error, isFetching }] =
    useLazyFetchEventsQuery({ ...NetworkConstants });

  const skipEventsLoading =
    calendarsIdsToView === undefined ||
    areCalendarsFetching ||
    areCalendarsLoading ||
    (nextPage !== null && nextPage === currentPage);

  const triggerFetchEvents = useCallback(
    (page: number | null = null) => {
      if (!skipEventsLoading) {
        return fetchEvents({
          page,
          filter: calendarsIdsToView,
        });
      }

      return Promise.resolve();
    },
    [fetchEvents, calendarsIdsToView, skipEventsLoading]
  );

  const errorMessage =
    (calendarsFetchingError || error) && t('UnableFetchCalendars');

  return {
    errorMessage,
    isLoading: areCalendarsLoading || isLoading,
    isFetching: areCalendarsFetching || isFetching,
    triggerFetchEvents,
    nextPage,
    prevPage,
  };
}

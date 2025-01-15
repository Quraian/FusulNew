import { createSelector } from '@reduxjs/toolkit';
import { CalendarPeriod } from '@prisma/client';

import {
  parseDate,
  calculateRemaining,
  formatDate,
  isThisYear,
  isInThePast,
  isInTheFuture,
  EventsByDateViewModel,
  isToday,
  getWeekdayDay,
  Calendar,
  CalendarEvent,
  groupBy,
} from '@fusul/common';
import { RootState, eventsAdapter } from '.';
import { CalendarOptions, Status } from '../common';
import { calendarsAdapter } from './slices/calendarSlice';

export const selectCalendarOptions = (state: RootState) =>
  state.user.preferences.calendarOptions;
export const selectLanguage = (state: RootState) =>
  state.user.preferences.language;
export const selectPreferences = createSelector(
  selectLanguage,
  selectCalendarOptions,
  (language, calendarOptions) => ({
    language,
    calendarOptions,
    isArabic: language === 'ar', // TODO: maybe isArabic and locale shouldn't be part of preferences?
    locale: `${language}-SA`,
    showGregorian:
      calendarOptions.eventsCalendarSelection === 'gregorianAndHijri' ||
      calendarOptions.eventsCalendarSelection === 'gregorian',
    showHijri:
      calendarOptions.eventsCalendarSelection === 'gregorianAndHijri' ||
      calendarOptions.eventsCalendarSelection === 'hijri',
  })
);

export const selectUser = (state: RootState) => state.user;
export const selectLocation = createSelector(
  selectUser,
  ({ location, city }) =>
    location.result
      ? location
      : {
          result: city && { latitude: city.lat, longitude: city.lon },
          status: 'succeeded' as Status,
          errorMessage: undefined,
        }
);

export const { selectAll: selectCalendars } =
  calendarsAdapter.getSelectors<RootState>((state) => state.calendars);

export const selectCalendarsForView = createSelector(
  selectCalendars,
  selectPreferences,
  (calendars, { isArabic }) =>
    calendars.map((c) => ({
      ...c,
      title: isArabic ? c.title : c.titleEn,
      description: isArabic ? c.description : c.descriptionEn,
    })) ?? []
);

const selectPeriods = createSelector(selectCalendars, (calendars) =>
  calendars.reduce(
    (a, c) => [...a, ...(c.periods || [])],
    [] as CalendarPeriod[]
  )
);

export const { selectAll: selectEvents } =
  eventsAdapter.getSelectors<RootState>((state) => state.events);

const selectEventsUpdateOn = (state: RootState) =>
  state.events.updatedTimeStamp;
export const selectEventsMetadata = (state: RootState) => state.events.meta;

const selectEventInFocus = (state: RootState) => state.events.selectedEvent;
export const selectSingleCalendarInFocus = createSelector(
  selectEventInFocus,
  (eventInFocus) => !!eventInFocus
);

export const selectCalendarInFocus = createSelector(
  selectCalendarsForView,
  selectPeriods,
  selectEventInFocus,
  (calendars, periods, events) =>
    events?.periodId
      ? findCalendarByPeriodId(calendars, periods, events?.periodId)
      : null
);

const selectPeriodsInFocus = createSelector(
  selectCalendarInFocus,
  (calendar) => calendar?.periods
);

export const selectCalendarsIdsToView = createSelector(
  selectCalendarInFocus,
  selectCalendarOptions,
  (calendar, options) => (calendar ? [calendar.id] : options.preferredCalendars)
);

export const selectEventsWithUpdatedOn = createSelector(
  selectEvents,
  selectEventsMetadata,
  selectEventsUpdateOn,
  (events, meta, updateOn) => ({
    events,
    meta,
    updateOn: updateOn ? new Date(updateOn) : null,
  })
);

const selectPreferredPeriods = createSelector(
  selectPreferences,
  selectPeriods,
  ({ calendarOptions: { preferredCalendars } }, periods) =>
    preferredCalendars &&
    periods
      .filter((p) => preferredCalendars.includes(p.calendarId))
      .map(({ id }) => id)
);

const selectPreferredEvents = createSelector(
  selectPreferredPeriods,
  selectEvents,
  selectPreferences,
  (preferredPeriods, events, { isArabic }) => {
    const filteredEvents = preferredPeriods?.length
      ? events?.filter((e) => preferredPeriods.includes(e.periodId))
      : events;

    return (
      filteredEvents?.map((c) => ({
        ...c,
        title: isArabic ? c.title : c.titleEn,
        description: isArabic ? c.description : c.descriptionEn,
      })) ?? []
    );
  }
);

function findCalendarByPeriodId(
  calendars: Calendar[],
  periods: CalendarPeriod[],
  periodId: number
) {
  const period = periods.find((p) => p.id === periodId);

  return calendars.find((c) => c.id === period?.calendarId);
}

export const selectEventsInFocusByDate = createSelector(
  [
    selectCalendarsForView,
    selectPeriodsInFocus,
    selectPreferredEvents,
    selectPreferences,
  ],
  (calendars, periodsInFocus, events, preferences): EventsByDateViewModel[] => {
    return groupEventsByDate(
      calendars,
      periodsInFocus ?? [],
      events.filter(({ periodId }) =>
        periodsInFocus?.map(({ id }) => id).includes(periodId)
      ) ?? [],
      preferences
    );
  }
);

export const selectEventsByDate = createSelector(
  [
    selectCalendarsForView,
    selectPeriods,
    selectPreferredEvents,
    selectPreferences,
  ],
  (calendars, periods, events, preferences): EventsByDateViewModel[] => {
    return groupEventsByDate(calendars, periods, events, preferences);
  }
);

function groupEventsByDate(
  calendars: Calendar[],
  periods: CalendarPeriod[],
  events: CalendarEvent[],
  {
    locale,
    calendarOptions: { remainingDays: remainingDaysOption },
  }: { locale: string; calendarOptions: CalendarOptions }
) {
  if (!calendars) {
    console.error('Calendars are not found, unable to get events.');

    return [];
  }

  const colors = Object.fromEntries(
    calendars.map(({ id, color }) => [id, color])
  );
  const withColors = events.map((e) => {
    const calendar = findCalendarByPeriodId(calendars, periods, e.periodId);
    return {
      ...e,
      start: e.start,
      color: calendar ? colors[calendar.id] : 'WHITE',
    };
  });

  const createFormatOptions = (date: Date, inHijri = false) =>
    formatDate(date, {
      inHijri,
      locale,
      formatOpts: isThisYear(date, inHijri)
        ? { month: 'long', day: 'numeric' }
        : {},
    });
  const containsHistoricalDates = events.some(({ start }) =>
    isInThePast(parseDate(start))
  );
  const firstInTheFutureOrToday = containsHistoricalDates
    ? events.find(
        ({ start }) =>
          isToday(parseDate(start)) || isInTheFuture(parseDate(start))
      )
    : null;

  return Object.entries(groupBy(withColors, (e) => e.start)).map(
    ([date, events]) => {
      const start = parseDate(date);
      const remaining =
        remainingDaysOption === 'none'
          ? undefined
          : calculateRemaining(start, remainingDaysOption);
      const startFormatted = createFormatOptions(start);
      const startFormattedInHijri = createFormatOptions(start, true);
      const weekday = getWeekdayDay(start, locale);

      return {
        events,
        // firstInTheFuture, means this group is the first one that has events in the future
        firstInTheFuture: firstInTheFutureOrToday
          ? events.some((e) => e.id === firstInTheFutureOrToday.id)
          : false,
        remaining,
        startFormatted,
        startFormattedInHijri,
        weekday,
      };
    }
  );
}

export const selectIsEventsLongPressed = (state: RootState) =>
  state.ui.eventsLongPressed;

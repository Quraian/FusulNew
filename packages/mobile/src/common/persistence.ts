import { Preferences } from '@capacitor/preferences';

import {
  EVENTS_META_DEFAULT_VALUES,
  UserState,
  UserStateSchema,
  buildUserState,
} from '../store';
import {
  Calendar,
  CalendarEvent,
  CalendarEventSchema,
  CalendarEventsPaginated,
  CalendarSchema,
  PaginationMetaData,
  uniqWith,
} from '@fusul/common';

enum Keys {
  UserState = 'UserState',
  Events = 'Events',
  EventsMeta = 'EventsMeta',
  EventsUpdatedOn = 'EventsUpdatedOn',
  Calendars = 'Calendars',
}

export async function resetStorage() {
  try {
    await Preferences.clear();
  } catch (error) {
    console.error(`Unable to clear storage. Error: ${JSON.stringify(error)}`);
  }
}

export async function invalidateCalendarsAndEventsCache() {
  try {
    await Preferences.remove({ key: Keys.Calendars });
    await invalidateEventsCache();
  } catch (error) {
    console.error(`Unable to clear storage. Error: ${JSON.stringify(error)}`);
  }
}

export async function invalidateEventsCache() {
  try {
    await Preferences.remove({ key: Keys.Events });
    await Preferences.remove({ key: Keys.EventsUpdatedOn });
  } catch (error) {
    console.error(`Unable to clear storage. Error: ${JSON.stringify(error)}`);
  }
}

async function load<T>(
  key: string,
  convert: (val: string | null) => T
): Promise<T> {
  try {
    const { value } = await Preferences.get({ key });
    return convert(value);
  } catch (error) {
    console.error(
      `Unable to load ${key} from local storage. Error: ${JSON.stringify(error)}`
    );
  }

  return convert(null);
}

export function persisUserState(state: UserState): Promise<void> {
  return Preferences.set({
    key: Keys.UserState,
    value: JSON.stringify(state),
  });
}

export async function loadUserState(): Promise<UserState> {
  // const [userState] = await Promise.all([loadUserState()]);
  return load(Keys.UserState, (val) => {
    if (val) {
      const parsed = UserStateSchema.safeParse(JSON.parse(val));

      if (parsed.success) {
        return parsed.data;
      }
    }

    return buildUserState({});
  });
}

export function persisEvents(
  events: CalendarEvent[],
  meta: PaginationMetaData,
  updatedOn?: Date | null
): Promise<unknown> {
  return Promise.all([
    Preferences.set({
      key: Keys.Events,
      value: JSON.stringify(events),
    }),
    Preferences.set({
      key: Keys.EventsMeta,
      value: JSON.stringify(meta),
    }),
    updatedOn &&
      Preferences.set({
        key: Keys.EventsUpdatedOn,
        value: updatedOn?.toISOString(),
      }),
  ]);
}

export function loadEvents(): Promise<CalendarEventsPaginated> {
  return load(Keys.Events, (val) => {
    if (val) {
      // Here you can use DatedObjectSchema @ \shared\src\lib\schema\index.ts
      const parsed = CalendarEventSchema.array().safeParse(JSON.parse(val));

      if (parsed.success) {
        return { data: parsed.data, meta: EVENTS_META_DEFAULT_VALUES };
      }
    }

    return { data: [], meta: EVENTS_META_DEFAULT_VALUES };
  });
}

export function areEventDataValid(events: CalendarEvent[]) {
  const unique = uniqWith(
    events,
    (e1, e2) => e1.start === e2.start && e1.title === e2.title
  );

  return events.length === unique.length;
}

export function persisCalendars(state: Calendar[]): Promise<void> {
  return Preferences.set({
    key: Keys.Calendars,
    value: JSON.stringify(state),
  });
}

export function loadCalendars(): Promise<Calendar[]> {
  return load(Keys.Calendars, (val) => {
    if (val) {
      const parsed = CalendarSchema.array().safeParse(JSON.parse(val));

      if (parsed.success) {
        return parsed.data;
      }
    }

    return [];
  });
}

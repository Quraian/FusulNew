export const EventConstants = {
  LIST_ITEMS_COUNT: 50,
} as const;

// TODO: probably should make it by name or maybe have it as a value in the DB
export const DEFAULT_PREFERRED_CALENDARS_IDS: ReadonlyArray<number> = [
  1, 2, 3, 4, 5,
];

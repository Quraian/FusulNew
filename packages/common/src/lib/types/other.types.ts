import { z } from 'zod';
import { DurationObjectUnits } from 'luxon';
import { CalendarEvent } from './calendar.types';

export const LanguageSchema = z.enum(['en', 'ar']);
export type Language = z.infer<typeof LanguageSchema>;

export const DatedObjectSchema = z.object({ updateOn: z.string().datetime() });

export type RemainingDuration = Required<
  Pick<DurationObjectUnits, 'days' | 'weeks' | 'months'>
>;

export type EventsByDateViewModel = {
  events: (CalendarEvent & { color: string })[];
  firstInTheFuture: boolean;
  remaining?: RemainingDuration;
  startFormatted: string;
  startFormattedInHijri: string;
  weekday: string;
};

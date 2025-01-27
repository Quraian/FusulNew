import { HTMLAttributes, PropsWithChildren } from 'react';
import { z } from 'zod';

import { GeoLocation } from '@fusul/common';
import { AsyncOp } from './generics';

export type CommonProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export type AsyncGeoLocation = AsyncOp<GeoLocation | undefined>;

export const StatusSchema = z.enum(['idle', 'pending', 'succeeded', 'failed']);
export type Status = z.infer<typeof StatusSchema>;

export const DescriptionOptionsSchema = z.enum(['none', 'always', 'onScroll']);
export type DescriptionOptions = z.infer<typeof DescriptionOptionsSchema>;

export const RemainingDaysOptionsSchema = z.enum(['none', 'short', 'extended']);
export type RemainingDaysOptions = z.infer<typeof RemainingDaysOptionsSchema>;

export const CALENDARS_SELECTION = [
  'gregorian',
  'hijri',
  'gregorianAndHijri',
] as const;
export const CalendarSelectionSchema = z.enum(CALENDARS_SELECTION);
export type CalendarSelection = z.infer<typeof CalendarSelectionSchema>;

export const CalendarOptionsSchema = z.object({
  descriptions: DescriptionOptionsSchema,
  eventsCalendarSelection: CalendarSelectionSchema,
  remainingDays: RemainingDaysOptionsSchema,
  preferredCalendars: z.array(z.number()).optional(),
});

export type CalendarOptions = z.infer<typeof CalendarOptionsSchema>;

export type Submittable = {
  onSubmit: (value: unknown) => void;
  onCancel: () => void;
};

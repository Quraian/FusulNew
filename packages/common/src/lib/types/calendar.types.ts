import { z } from 'zod';

import { CalendarGroupSchema, ColorSchema } from './enums';

const HasDescriptionSchema = z.object({
  description: z.string().optional().nullable(),
  descriptionEn: z.string().optional().nullable(),
});

export type HasDescription = z.infer<typeof HasDescriptionSchema>;

const PaginationMetadataSchema = z.object({
  total: z.number().optional(),
  lastPage: z.number().nullable(),
  currentPage: z.number().nullable(),
  perPage: z.number().nullable(),
  prev: z.number().nullable(),
  next: z.number().nullable(),
});

export type PaginationMetaData = z.infer<typeof PaginationMetadataSchema>;

export const CalendarEventSchema = z
  .object({
    id: z.number(),
    title: z.string().min(3),
    titleEn: z.string(),
    periodId: z.number(),
    start: z.string().datetime(),
    end: z.string().datetime().optional().nullable(),
  })
  .merge(HasDescriptionSchema);

export const CalendarEventsPaginatedSchema = z.object({
  data: z.array(CalendarEventSchema),
  meta: PaginationMetadataSchema,
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;
export type CalendarEventsPaginated = z.infer<
  typeof CalendarEventsPaginatedSchema
>;

export const CalendarPeriodSchema = z.object({
  id: z.number(),
  title: z.string().min(3),
  titleEn: z.string(),
  calendarId: z.number(),
  events: CalendarEventSchema.array().optional().nullable(),
});

export type CalendarPeriod = z.infer<typeof CalendarPeriodSchema>;

export const CalendarSchema = z
  .object({
    id: z.number(),
    title: z.string().min(3),
    titleEn: z.string(),
    group: CalendarGroupSchema,
    color: ColorSchema,
    periods: CalendarPeriodSchema.array().optional().nullable(),
  })
  .merge(HasDescriptionSchema);

export type Calendar = z.infer<typeof CalendarSchema>;

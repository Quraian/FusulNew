import {
  Color as AllColors,
  CalendarGroup as AllCalendarGroups,
} from '@prisma/client';
import { z } from 'zod';

const colors = Object.entries(AllColors).map(([k]) => k);
const ALL_COLORS: [string, ...string[]] = [
  colors[0],
  // And then merge in the remaining values from `colors`
  ...colors.slice(1).map((p) => p),
];
export const ColorSchema = z.enum(ALL_COLORS);
export type Color = z.infer<typeof ColorSchema>;

const group = Object.entries(AllCalendarGroups).map(([k]) => k);
const ALL_GROUPS: [string, ...string[]] = [
  group[0],
  ...group.slice(1).map((p) => p),
];
export const CalendarGroupSchema = z.enum(ALL_GROUPS);
export type CalendarGroup = z.infer<typeof CalendarGroupSchema>;

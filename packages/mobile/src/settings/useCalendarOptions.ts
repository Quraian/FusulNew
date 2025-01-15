import {
  useAppSelector,
  selectCalendarOptions,
  selectCalendarsForView,
  setCalendarOptions,
  useAppDispatch,
} from '../store';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';

import { isEqual } from '@fusul/common';
import {
  CalendarOptions,
  CalendarSelectionSchema,
  DescriptionOptionsSchema,
  RemainingDaysOptionsSchema,
} from '../common';

export function useCalendarOptions() {
  const dispatch = useAppDispatch();
  const staleOptions = useAppSelector(selectCalendarOptions);
  const calendars = useAppSelector(selectCalendarsForView);
  const [options, setOptions] = useImmer<CalendarOptions>(staleOptions);

  useEffect(() => {
    dispatch(setCalendarOptions(options));
  }, [dispatch, options]);

  function onDescriptionChange(value: unknown) {
    setOptions((draft) => {
      draft.descriptions = DescriptionOptionsSchema.parse(value);
    });
  }

  function onDescriptionToggle(checked: boolean) {
    setOptions((draft) => {
      draft.descriptions = checked ? 'always' : 'none';
    });
  }

  function onCalendarSelectionChange(value: unknown) {
    setOptions((draft) => {
      draft.eventsCalendarSelection = CalendarSelectionSchema.parse(value);
    });
  }

  function onRemainingDaysToggle(checked: boolean) {
    setOptions((draft) => {
      draft.remainingDays = checked ? 'extended' : 'none';
    });
  }

  function onRemainingDaysChange(value: unknown) {
    setOptions((draft) => {
      draft.remainingDays = RemainingDaysOptionsSchema.parse(value);
    });
  }

  function onPreferredCalendarChange(value: unknown) {
    setOptions((draft) => {
      draft.preferredCalendars = value as number[];
    });
  }

  return {
    calendars,
    ...options,
    shouldDisableRemainingDays: options.remainingDays === 'none',
    shouldDisableDescription: options.descriptions === 'none',
    onDescriptionChange,
    onDescriptionToggle,
    onCalendarSelectionChange,
    onRemainingDaysToggle,
    onRemainingDaysChange,
    onPreferredCalendarChange,
    submitEnabled: !isEqual(staleOptions, options),
  };
}

import { useState } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { useTranslation } from 'react-i18next';

import { toTimeOnly } from '@fusul/common';
import { useAppSelector, selectPreferences, selectLocation } from '../store';
import { Prayer } from './prayer';
import { useDateTime } from '../datetime/useDateTime';
import { Status } from '../common';

export type PrayersVm = {
  status?: Status;
  prayers: Prayer[];
  next: Prayer | null;
  sunrise: string;
  sunset: string;
  errorMessage?: string;
};

export function usePrayers(): PrayersVm {
  const { locale } = useAppSelector(selectPreferences);
  const { status, result, errorMessage } = useAppSelector(selectLocation);
  const [showNextDay, setShowNextDay] = useState(false);
  const dateTimeHelper = useDateTime();
  const { now, nextDay } = dateTimeHelper;
  const { t } = useTranslation();

  const initial = {
    next: null,
    prayers: [],
    sunset: '',
    sunrise: '',
  };

  if (!result || status === 'pending') {
    return {
      ...initial,
      status,
    };
  }

  if (status === 'failed') {
    return {
      ...initial,
      status,
      errorMessage: errorMessage ?? t('UnableGetLocationInformation'),
    };
  }

  const coordinates = new Coordinates(result.latitude, result.longitude);
  const prayerTimes = new PrayerTimes(
    coordinates,
    showNextDay ? nextDay : now,
    CalculationMethod.UmmAlQura()
  );
  const next = prayerTimes.nextPrayer();

  if (next === 'none') {
    if (!showNextDay) {
      setShowNextDay(true);
    }
    return initial;
  }

  const prayers: Prayer[] = [
    {
      name: t('fajr'),
      time: toTimeOnly(prayerTimes.fajr, locale),
      remaining: dateTimeHelper.getTimeFromNow(prayerTimes.fajr),
    },
    {
      name: t('dhuhr'),
      time: toTimeOnly(prayerTimes.dhuhr, locale),
      remaining: dateTimeHelper.getTimeFromNow(prayerTimes.dhuhr),
    },
    {
      name: t('asr'),
      time: toTimeOnly(prayerTimes.asr, locale),
      remaining: dateTimeHelper.getTimeFromNow(prayerTimes.asr),
    },
    {
      name: t('maghrib'),
      time: toTimeOnly(prayerTimes.maghrib, locale),
      remaining: dateTimeHelper.getTimeFromNow(prayerTimes.maghrib),
    },
    {
      name: t('isha'),
      time: toTimeOnly(prayerTimes.isha, locale),
      remaining: dateTimeHelper.getTimeFromNow(prayerTimes.isha),
    },
  ];

  const nextPrayerDate = prayerTimes.timeForPrayer(next);

  return {
    next:
      next !== 'sunrise'
        ? {
            name: t(next),
            time: nextPrayerDate ? toTimeOnly(nextPrayerDate, locale) : null,
            remaining: dateTimeHelper.getTimeFromNow(nextPrayerDate),
          }
        : null,
    errorMessage,
    prayers,
    sunrise: toTimeOnly(prayerTimes.sunrise, locale),
    sunset: toTimeOnly(prayerTimes.sunset, locale),
  };
}

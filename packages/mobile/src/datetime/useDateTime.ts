import { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { useInterval } from 'usehooks-ts';
import { t } from 'i18next';

import { formatDate, getDifference } from '@fusul/common';
import { useAppSelector, selectPreferences } from '../store';

export function useDateTime() {
  const { locale, isArabic } = useAppSelector(selectPreferences);
  const [now, setNow] = useState(new Date());

  const date = useMemo(() => {
    return {
      dateFormatted: formatDate(now, {
        inHijri: false,
        locale,
        formatOpts: DateTime.DATE_HUGE,
      }),
      dateFormattedHijri: formatDate(now, {
        inHijri: true,
        locale,
        formatOpts: DateTime.DATE_FULL,
      }),
    };
  }, [locale, now]);

  useInterval(() => {
    setNow(new Date());
  }, 1000);

  return {
    ...date,
    now,
    nextDay: DateTime.fromJSDate(now).plus({ day: 1 }).toJSDate(),
    getTimeFromNow(date?: Date | null) {
      const timeDiff = getDifference(date, now);

      if (timeDiff?.minutes === undefined || timeDiff?.hours === undefined) {
        return '';
      }

      const { minutes, hours } = timeDiff;

      const inThePast = minutes < 0 || hours < 0;
      const hoursToDisplay = hours
        ? `${Math.abs(hours).toLocaleString(locale)}${t('h')}`
        : '';
      const minutesToDisplay =
        minutes && Math.floor(minutes)
          ? `${Math.abs(Math.floor(minutes)).toLocaleString(locale)}${t('m')}`
          : '';
      const separator = minutesToDisplay && hoursToDisplay ? ' ' : '';

      const remainingText = `${hoursToDisplay}${separator}${minutesToDisplay}`;

      if (inThePast) {
        return isArabic
          ? `${t('ago')} ${remainingText}`
          : `${remainingText} ${t('ago')}`;
      }

      return remainingText;
    },
  };
}

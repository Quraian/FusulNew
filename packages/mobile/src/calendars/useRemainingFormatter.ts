import { useTranslation } from 'react-i18next';

import { RemainingDuration, getReamingDetails } from '@fusul/common';
import { useAppSelector, selectPreferences } from '../store';

export function useRemainingFormatter(remaining?: RemainingDuration) {
  const { isArabic } = useAppSelector(selectPreferences);
  const { t } = useTranslation();
  if (!remaining) {
    return null;
  }

  const {
    isYesterday,
    isToday,
    isTomorrow,
    isInThePast,
    containsDays,
    containsWeeks,
    containsMonths,
  } = getReamingDetails(remaining);

  if (isYesterday) {
    return t('Yesterday');
  } else if (isToday) {
    return t('Today');
  } else if (isTomorrow) {
    return t('Tomorrow');
  }

  const { months, weeks, days } = remaining;
  const daysDisplay = containsDays && t('D', { count: Math.abs(days) });
  const weeksDisplay = containsWeeks && t('W', { count: Math.abs(weeks) });
  const monthsDisplay = containsMonths && t('M', { count: Math.abs(months) });
  const remainingText = [monthsDisplay, weeksDisplay, daysDisplay]
    .filter(Boolean)
    .join(isArabic ? ` ${t('and')}` : ' ');

  if (!isInThePast) {
    return remainingText;
  }

  return isArabic
    ? `${t('ago')} ${remainingText}`
    : `${remainingText} ${t('ago')}`;
}

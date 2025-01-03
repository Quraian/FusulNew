import { CalendarGroup } from '@prisma/client';

import {
  ProspectiveCalendar,
  ProspectiveEvent,
  ProspectivePeriod,
} from '../../types';
import {
  CalendarGroupColors,
  DEFAULT_HIJRI_IMPLEMENTATION,
} from '../../helper';

const events: ProspectiveEvent[] = [
  {
    title: 'بداية السنة الهجرية',
    titleEn: 'First day of the Hijri calendar',
    start: '1444/01/01',
  },
  {
    title: 'عاشوراء',
    titleEn: 'Ashura',
    start: '1444/01/10',
    description:
      'عاشوراء هو اليوم العاشر من شهر مُحَرَّم في التقويم الهجري، وهو اليوم الذي نجّىٰ الله فيه موسى من فرعون',
    descriptionEn:
      'Ashura is a day of commemoration in Islam, it occurs annually on the tenth of Muharram, the first month of the Islamic calendar.',
  },
  {
    title: 'بداية رمضان',
    titleEn: 'First day of Ramadan',
    start: '1444/09/01',
  },
  {
    title: 'عيد الفطر',
    titleEn: 'Eid al-Fitr',
    start: '1444/10/01',
  },
  {
    title: 'يوم التروية',
    titleEn: 'Day of Tarwiyah',
    description:
      'يوم التروية هو اليوم الثامن من شهر ذي الحجة، وسمي بهذا الاسم لأن الناس كانوا يرتوون فيه من الماء في مكة ويخرجون به إلى منى حيث كان معدوماً في تلك الأيام ليكفيهم حتى اليوم الأخير من أيام الحج',
    start: '1444/12/08',
  },
  {
    title: 'يوم عرفة',
    titleEn: 'Day of Arafah',
    start: '1444/12/09',
  },
  {
    title: 'عيد اﻷضحى',
    titleEn: 'Eid al-Adha',
    start: '1444/12/10',
  },
  {
    title: 'أيام التشريق',
    titleEn: 'The days of Tashriq',
    description:
      'أيام التشريق هي الأيام الثلاثة بعد يوم النحر، وهي أيام الحادي عشر والثاني عشر والثالث عشر من شهر ذي الحجة. وهي أيام أكل وشرب وذكر لله، وبغروب شمس اليوم الثالث عشر ينتهي عيد اﻷضحى والحج وذبح الأضحية.',
    descriptionEn:
      'The days of Tashriq (the three days following Idul Ad-ha, i.e. 11th , 12th and 13th of Dhul Hijjah) are days of eating, drinking and remembering (dhikr) of Allah',
    start: '1444/12/11',
  },
];

const periods: ProspectivePeriod[] = [
  { title: '1444', titleEn: '1444', events },
];

export const islamicCalendar: ProspectiveCalendar = {
  title: 'التقويم الإسلامي',
  titleEn: 'Islamic Calendar',
  description: 'اﻷيام المهمة في التقويم اﻹسلامي',
  descriptionEn: 'Significant days in the Islamic calendar',
  group: CalendarGroup.Religious,
  color: CalendarGroupColors[CalendarGroup.Religious],
  periods,
  ...DEFAULT_HIJRI_IMPLEMENTATION,
};

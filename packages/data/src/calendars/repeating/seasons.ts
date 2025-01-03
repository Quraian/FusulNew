import { CalendarGroup, Color } from '@prisma/client';

import {
  ProspectiveCalendar,
  ProspectiveEvent,
  ProspectivePeriod,
} from '../types';
import { DEFAULT_GREGORIAN_IMPLEMENTATION } from '../helper';

const events: ProspectiveEvent[] = [
  {
    title: 'الشبط',
    titleEn: 'Alshbt (الشبط)',
    start: '2023-01-15',
    description:
      'يتسم بسرعة تقلباته الجوية، وإذا هبت الريح فيه تكون باردة، والعامة يسمونه "مبكية الحصني"',
    descriptionEn:
      'It is characterized by rapid weather fluctuations, and if the wind blows there, it is cold',
  },
  {
    title: 'العقارب',
    titleEn: "Al'eqarb (العقارب)",
    start: '2023-02-10',
    description:
      'موسم انتقالي تتغير فيه الأجواء من البرودة إلى الدفء وبداية الحر، وينتهي موسم الشتاء الفعلي مع نهايته',
    descriptionEn:
      'A transitional season in which the weather changes from cold to warmth and the onset of heat, and the actual winter season ends with its end',
  },
  {
    title: 'فصل الربيع',
    titleEn: 'Spring',
    start: '2023-03-01',
  },
  {
    title: 'الحميمين',
    titleEn: 'Alhmymyn (الحميمين)',
    start: '2023-03-21',
    description:
      'بداية اﻹعتدال الربيعي حيث تتعامد الشمس على خط الاستواء ويتساوى الليل والنهار ثم يأخذ النهار بالزيادة على حساب الليل. ويطلق عليه العامة بياع الخبل عباته',
    descriptionEn:
      'The beginning of the vernal equinox, where the sun is perpendicular to the equator and day and night are equal, and then the day begins to increase at the expense of the night',
  },
  {
    title: 'الأذرعة',
    titleEn: "Aladr'eh (الأذرعة)",
    start: '2023-04-16',
    description:
      'له ذراعان من الصيف والربيع، وفي نهايته نودع الربيع. ويطلق عليه العامة موسم الذرعان',
    descriptionEn:
      'It crosses over summer and spring, and at the end of it we bid farewell to spring',
  },
  {
    title: 'الثريا',
    titleEn: 'Althrya (الثريا)',
    start: '2023-05-12',
    description:
      'تكثر فيه هبوب العواصف والرياح، خاصة إذا كانت السنة قليلة المطر. ويعد من مواسم الأمطار في المملكة والخليج',
    descriptionEn:
      'There are frequent storms and winds, especially if the year has little rain. It is one of the rainy seasons in the Kingdom and the Gulf',
  },
  {
    title: 'فصل الصيف',
    titleEn: 'Summer',
    start: '2023-06-01',
  },
  {
    title: 'التويبع',
    titleEn: "Altwyb'e (التويبع)",
    start: '2023-06-20',
    description:
      'فيه أطول نهار، وأقصر ليل، ثم يبدأ الليل في الزيادة، وينعدم ظل الزوال، كما تشتد فيه حرارة الجو، ويتلون طلع النخيل. وفيه طباخ اللون، وهو تحوُّل اللون من الأخضر إلى الأصفر أو الأحمر',
    descriptionEn:
      'It has the longest day and the shortest night, then the night begins to increase, the air temperature also increases, and the palm pollen becomes colorful',
  },
  {
    title: 'الجوزاء',
    titleEn: "Aljwza' (الجوزاء)",
    start: '2023-07-03',
    description:
      'موسم انتقالي، غرته تنهض رياح السموم، والتي تعمل على رفع درجات الحرارة، ويعتبر بداية الحر اللاهب، بما يسمى بجمرة القيظ',
    descriptionEn:
      'A transitional season, marked by the rise of hot winds, which work to raise temperatures, and it is considered the beginning of the scorching heat, with what is called the ember of heat',
  },
  {
    title: 'المرزم',
    titleEn: 'Almrzm (المرزم)',
    start: '2023-07-29',
    description:
      'قمة اشتداد الحرارة وخلاله يتعب المزارع في جني الثمار وخراف النخيل والسقيا والعامة يقولون: "لا دخل المرزم، يا زراع الزم"',
    descriptionEn: 'The height of the intense heat',
  },
  {
    title: 'الكليبين',
    titleEn: 'Alklybyn (الكليبين)',
    start: '2023-08-11',
    description:
      'آخر منازل الحر الشديد، ومن علاماته أن تغور مياه الآبار، خاصة في المناطق التي لا تسقط فيها الأمطار الصيفية،',
    descriptionEn:
      'The last of the extreme heat, one of its signs is that well water subsides, especially in areas where summer rains do not fall',
  },
  {
    title: 'فصل الخريف',
    titleEn: 'Autumn (Fall)',
    start: '2023-09-01',
  },
  {
    title: 'سهيل',
    titleEn: 'Suhyl (سهيل)',
    start: '2023-09-06',
    description: 'تنكسر بدخوله حدة الحرارة، وتميل الأجواء للاعتدال والبرودة',
    descriptionEn:
      'With its entry the intensity of the heat breaks, and the atmosphere tends to be moderate and cool',
  },
  {
    title: 'الوسم',
    titleEn: 'Alwsm (الوسم)',
    start: '2023-10-16',
    description:
      'تتساقط فيه الأمطار بداية فصل الخريف بعد انتهاء فصل الصيف، حيث تتلاشى حرارة الأجواء وتبدأ بالتحسن تدريجيًا. وسمي بالوسم لأنه يترك أثراً على الأرض ويسمها بالخضرة والنبات',
    descriptionEn:
      'In it, rain falls at the beginning of the autumn season after the end of summer, as the atmospheric temperature diminishes and gradually improves',
  },
  {
    title: 'فصل الشتاء',
    titleEn: 'Winter',
    start: '2023-12-01',
  },
  {
    title: 'المربعانية',
    titleEn: "Almrb'eanyh (المربعانية)",
    start: '2023-12-07',
    description:
      'بداية شدة البرد. تكون شدة البرد غالبًا في الظل وداخل المنازل؛ لأن برودتها تكون ببرودة الأرض',
    descriptionEn:
      'It is the beginning of the intense cold. Intense cold typically occurs in shaded areas and inside homes because its coldness is influenced by the coldness of the ground',
  },
];

const periods: ProspectivePeriod[] = [
  {
    title: '2023',
    titleEn: '2023',
    events,
  },
];

export const seasonsCalendar: ProspectiveCalendar = {
  title: 'مواسم وفصول السنة',
  titleEn: 'Seasons',
  description: 'فصول السنة مع المواسم مثل الشبط، العقارب، المربعانية. إلخ..',
  descriptionEn:
    'The seasons of the year plus the agricultural/climatic local calendar',
  group: CalendarGroup.SeasonsAndAstronomy,
  color: Color.DODGERBLUE,
  periods,
  ...DEFAULT_GREGORIAN_IMPLEMENTATION,
};

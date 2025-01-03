import { CalendarGroup } from '@prisma/client';

import {
  ProspectiveCalendar,
  ProspectiveEvent,
  ProspectivePeriod,
} from '../types';
import {
  CalendarGroupColors,
  DEFAULT_GREGORIAN_IMPLEMENTATION,
} from '../helper';

const events: ProspectiveEvent[] = [
  {
    title: 'الشولة',
    titleEn: 'Shaula',
    start: '2023-01-02',
    description: 'استمرار شدة البرد والصقيع والضباب',
    descriptionEn: 'The continuation of intense cold, frost, and fog',
  },
  {
    title: 'النعائم',
    titleEn: 'Al Naam',
    start: '2023-01-15',
    description: 'بردها قارس وشديد، وفيه هجرة طيور القطا',
    descriptionEn: 'Its cold is intense and severe',
  },
  {
    title: 'البلدة',
    titleEn: 'Al Baldaah',
    start: '2023-01-28',
    description: 'فيها يشتد البرد ويجمد الماء',
    descriptionEn: 'In it, the cold intensifies, and the water freezes',
  },
  {
    title: 'سعد الذابح',
    titleEn: 'Saad Al Thabib',
    start: '2023-02-10',
    description: 'يبدأ فيه جريان الماء في فروع الشجر ويكثر العشب والفقع',
    descriptionEn:
      'In it, the flow of water begins in the branches of the trees, and grass and desert truffles proliferate',
  },
  {
    title: 'سعد بلع',
    titleEn: 'Saad Balaa',
    start: '2023-02-23',
    description: 'يكثر فيه المطر بإذن الله وفي آخره ربما يكون البرد قارساً',
    descriptionEn:
      'In it, rain increases, God willing, and towards its end, it may become intensely cold with possible frost',
  },
  {
    title: 'سعد السعود',
    titleEn: 'Saad Al Saud',
    start: '2023-03-08',
    description: 'فيه يعتدل الطقس وتخضر الأرض ويكثر العشب ويزداد الفقع',
    descriptionEn:
      'In it, the weather becomes moderate, the land turns green, and grass and desert truffles proliferate',
  },
  {
    title: 'سعد الأخبية',
    titleEn: 'Saad Al Akhbia',
    start: '2023-03-21',
    description:
      'يزداد فيه الدفء واخضرار الأشجار وتخرج الهوام والحشرات من مخابئها',
    descriptionEn:
      'In it, warmth increases, trees become green, and birds and insects emerge from their hiding places',
  },
  {
    title: 'المقدم',
    titleEn: 'Almuqaddam',
    start: '2023-04-03',
    description: 'برده يهلك الثمار، وفيه هجرة طيور الوز الربيعي',
    descriptionEn:
      'Cold that harms fruits, and it is the migration period of spring geese.',
  },
  {
    title: 'المؤخر',
    titleEn: 'Al Muakhar',
    start: '2023-04-16',
    description: 'إذا حدث فيه مطر فيكون بإذن الله غزيراً ويخضر به العشب',
    descriptionEn:
      'If it rains in it, it will be, God willing, abundant, and the grass will turn green.',
  },
  {
    title: 'الرشاء',
    titleEn: 'Alrescha',
    start: '2023-04-29',
    description:
      'مطره غزير بإذن الله وتهب فيه الرياح وتكثر فيه طيور القمري والصفارى',
    descriptionEn:
      'Its rain is heavy, God willing, and in it, the winds blow, and turtle dove and yellow birds increase.',
  },
  {
    title: 'الشرطين',
    titleEn: 'Sharaṭān',
    start: '2023-05-12',
    description: 'يميل الطقس فيه إلى الدفء وتكثر فيه العواصف وبه أمطار خفيفة',
    descriptionEn:
      'The weather tends to be warm, with frequent storms and light rain',
  },
  {
    title: 'البطين',
    titleEn: 'Al-Buṭayn',
    start: '2023-05-25',
    description: 'بدء مربعانية القيظ وزيادة الحرارة ويبدأ جفاف العشب',
    descriptionEn:
      'The onset of hot weather, the temperature increases, and the grass begins to dry out',
  },
  {
    title: 'الثريا',
    titleEn: 'Althuraya',
    start: '2023-06-07',
    description: 'يشتد الحر وتكثر العواصف ويجف العشب',
    descriptionEn: 'Heat intensifies, storms increase, and the grass dries up.',
  },
  {
    title: 'الدبران',
    titleEn: 'Aldebaran',
    start: '2023-06-20',
    description: 'في الخامس منه ينعدم ظل الزوال لتعامد الشمس مع مدار السرطان',
    descriptionEn:
      'On its fifth day, the noon shadow disappears as the sun aligns with the Tropic of Cancer.',
  },
  {
    title: 'الهقعة',
    titleEn: 'Al-Haq‘ah',
    start: '2023-07-03',
    description: 'يشتد الحر وتكثر السموم والعواصف وتبدأ زيادة الليل',
    descriptionEn:
      'Heat intensifies, heat storms increase, and the nights start getting longer.',
  },
  {
    title: 'الهنعة',
    titleEn: 'Al-Han‘ah',
    start: '2023-07-16',
    description: 'يبلغ الحر أشده وجمرة القيظ واشتداد السموم حتى منتصف الليل',
    descriptionEn:
      'Heat reaches its peak, midsummer arrives, and toxins intensify until midnight.',
  },
  {
    title: 'الذراع',
    titleEn: "AlThera'",
    start: '2023-07-29',
    description: 'يشتد فيه الحر والسموم مع حدوث عواصف ترابية وغيوم مع مطر خفيف',
    descriptionEn:
      'Heat intensifies with the occurrence of dust storms and clouds with light rain.',
  },
  {
    title: 'النثرة',
    titleEn: 'An Nathra',
    start: '2023-08-11',
    description: 'يلطف الجو قليلاً وبالأخص في ساعات المساء',
    descriptionEn:
      'The weather softens a little, especially in the evening hours.',
  },
  {
    title: 'الطرفة',
    titleEn: 'Alterf',
    start: '2023-08-24',
    description: 'يلطف الجو ليلاً مع بقاء الحر في ساعات النهار',
    descriptionEn:
      'The weather softens at night, with the heat remaining during daylight hours.',
  },
  {
    title: 'الجبهة',
    titleEn: 'Jabbah',
    start: '2023-09-06',
    description: 'أول نجوم الخريف يبرد الليل ويتحسن الطقس نهاراً',
    descriptionEn:
      'The first stars of autumn, the night cools down, and the weather improves during the day.',
  },
  {
    title: 'الزبرة',
    titleEn: 'Azzubra',
    start: '2023-09-20',
    description: 'تزداد برودة الليل وينصح بعدم النوم تحت أديم السماء',
    descriptionEn:
      'Night becomes colder, and it is advisable not to sleep under the open sky.',
  },
  {
    title: 'الصرفة',
    titleEn: 'Assarfa',
    start: '2023-10-13',
    description: 'سميت بذلك لانصراف الحر عند طلوعها',
    descriptionEn: 'It is named so due to the departure of heat when it rises.',
  },
  {
    title: 'العواء',
    titleEn: 'Auva',
    start: '2023-10-16',
    description: 'أول نجوم الوسم وأمطاره تنبت الفقع وجميع الأعشاب البرية',
    descriptionEn:
      'The first stars of winter, and their rains make desert truffles and all wild herbs grow.',
  },
  {
    title: 'السماك',
    titleEn: 'Simak',
    start: '2023-10-29',
    description:
      'تزداد البرودة وتكثر فيه الأمطار بإذن الله، وهو بداية هجرة الحبارى ',
    descriptionEn:
      'Cold increases, and there is more rain, God willing. It marks the beginning of the Chlamydotis/Houbara migration.',
  },
  {
    title: 'الغفر',
    titleEn: 'Ghafir',
    start: '2023-11-11',
    description: 'تزداد البرودة عما قبله',
    descriptionEn: 'The cold increases compared to before.',
  },
  {
    title: 'الزبانا',
    titleEn: 'Az Zubana',
    start: '2023-11-24',
    description: 'نهاية فصل الخريف وبداية فصل الشتاء وتشتد فيه البرودة',
    descriptionEn:
      'The end of the autumn season and the beginning of winter, and it gets colder.',
  },
  {
    title: 'الإكليل',
    titleEn: 'Akleel',
    start: '2023-12-07',
    description: 'أول مربعانية الشتاء قارس البرودة وتكثر فيه الأمطار بإذن الله',
    descriptionEn:
      'The start of midwinter, is bitterly cold, and there is more rain, God willing.',
  },
  {
    title: 'القلب',
    titleEn: 'Qalb al Akraab',
    start: '2023-12-20',
    description: 'يشتد البرد والرياح ويظهر الضباب وتكثر الغيوم',
    descriptionEn:
      'The cold and winds intensify, fog appears, and clouds increase.',
  },
];

const periods: ProspectivePeriod[] = [
  {
    title: '2023',
    titleEn: '2023',
    events,
  },
];

// - Lunar station (Arabic manzil)
// - https://ar.wikipedia.org/wiki/منازل_القمر#ترتيب_الأنواء
// - https://faculty.kfupm.edu.sa/phys/alshukri/phys215/المنازل_الفلكية.htm
// - https://www.almisnid.com/almisnid/days.php

export const lunarStationsCalendar: ProspectiveCalendar = {
  title: 'المنازل القمرية (الأنواء)',
  titleEn: 'Lunar station (Arabic manzil)',
  group: CalendarGroup.SeasonsAndAstronomy,
  color: CalendarGroupColors[CalendarGroup.SeasonsAndAstronomy],
  description:
    'أنواء أو منازل القمر أو النَّوْء هو النجم إِذا مال للمَغِيب، والجمع أَنْواءٌ ونُوآنٌ وقيل: معنى النَّوْءِ سُقوطُ نجم من الـمَنازِل في المغرب مع الفجر وطُلوعُ رَقِيبه، وهو نجم آخر يُقابِلُه، من ساعته في المشرق. وربط العرب في العصر الجاهلي بين ساعات شروق المنازل القمرية وغروبها وأحوال الرياح والأمطار والحر والبرد.',
  periods,
  ...DEFAULT_GREGORIAN_IMPLEMENTATION,
};

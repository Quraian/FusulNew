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
    title: 'مُحَرَّم',
    titleEn: 'Muharram',
    start: '1444/01/01',
    description: 'سمي المحرم لأن العرب قبل الإسلام كانوا يحرّمون القتال فيه.',
  },
  {
    title: 'صَفَر',
    titleEn: 'Safar',
    start: '1444/02/01',
    description:
      'سمي صفرا لأن ديار العرب كانت تصفر أي تخلو من أهلها للحرب وقيل لأن العرب كان يغزون فيه القبائل فيتركون من لقوا صفر المتاع.',
  },
  {
    title: 'رَبِيعٌ الأَوَّل',
    titleEn: "Rabi' al-Awwal",
    start: '1444/03/01',
    description: 'سمي بذلك لأن تسميته جاءت في الربيع فلزمه ذلك الاسم.',
  },
  {
    title: 'رَبِيعٌ الآخِر',
    titleEn: "Rabi' al-Akhir",
    start: '1444/04/01',
    description: 'سمي بذلك لأنه تبع الشّهر المسمّى بربيع الأول.',
  },
  {
    title: 'جُمَادَى الأُولى',
    titleEn: 'Jumada al-Awwal',
    start: '1444/05/01',
    description:
      'كانت تسمى قبل الإسلام باسم جمادى خمسة، وسميت جمادى لوقوعها في الشتاء وقت التسمية حيث جمد الماء وهي مؤنثة النطق.',
  },
  {
    title: 'جُمَادَى الآخِرَة',
    titleEn: 'Jumada al-Akhirah',
    start: '1444/06/01',
    description: 'سمي بذلك لأنه تبع الشهر المسمى بجمادى الأولى.',
  },
  {
    title: 'رَجَب',
    titleEn: 'Rajab',
    start: '1444/07/01',
    description:
      'سمي رجبا لترجيبهم الرّماح من الأسنة لأنها تنزع منها فلا يقاتلوا، وقيل: رجب أي توقف عن القتال. ويقال رجب الشيءَ أي هابه وعظمه.',
  },
  {
    title: 'شَعْبَان',
    titleEn: "Sha'ban",
    start: '1444/08/01',
    description:
      'لأنه شعب بين رجب ورمضان، وقيل: يتفرق الناس فيه ويتشعبون طلبا للماء. وقيل لأن العرب كانت تتشعب فيه (أي تتفرق)؛ للحرب والإغارات بعد قعودهم في شهر رجب.',
  },
  {
    title: 'رَمَضَان',
    titleEn: 'Ramadan',
    start: '1444/09/01',
    description:
      'سُمّي بذلك لرموض الحر وشدة وقع الشمس فيه وقت تسميته، حيث كانت الفترة التي سمي فيها شديدة الحر. ويقال: رمضت الحجارة، إذا سخنت بتأثير الشمس.',
  },
  {
    title: 'شَوَّال',
    titleEn: 'Shawwal',
    start: '1444/10/01',
    description:
      'لشولان النوق فيه بأذنابها إذا حملت "أي نقصت وجف لبنها"، فيقال تشوَّلت الإبل: إذا نقص وجفّ لبنها.',
  },
  {
    title: 'ذُو القَعْدَة',
    titleEn: "Dhu al-Qi'dah",
    start: '1444/11/01',
    description:
      'سمي ذا القعدة لقعودهم في رحالهم عن الغزو والترحال فلا يطلبون كلأً ولا ميرة على اعتباره من الأشهر الحرم.',
  },
  {
    title: 'ذُو الحِجَّة',
    titleEn: 'Dhu al-Hijjah',
    start: '1444/12/01',
    description: 'سمي بذلك لأن العرب قبل الإسلام يذهبون للحج في هذا الشهر.',
  },
];

const periods: ProspectivePeriod[] = [
  { title: '1444', titleEn: '1444', events },
];

export const hijriCalendar: ProspectiveCalendar = {
  title: 'التقويم الهجري',
  titleEn: 'Hijri Calendar',
  description:
    'هو تقويم قمريّ، أي أنه يعتمد على دورة القمر لتحديد الأشهر، مكون من 12 شهرًا قمريًا في عام ذي 354 أو 355 يومًا. ويستخدمه المسلمون حاليًا خاصة في تحديد شهر رمضان، والأشهر الحُرُم، وأشهر الحج، والأعياد، وعدة الطلاق، وعدة الحامل، ودفع الزكاة.',
  descriptionEn:
    'is a lunar calendar consisting of 12 lunar months in a year of 354 or 355 days. It is used to determine the proper days of Islamic holidays and rituals, such as the annual fasting and the annual season for the great pilgrimage.',
  group: CalendarGroup.Religious,
  color: CalendarGroupColors[CalendarGroup.Religious],
  periods,
  ...DEFAULT_HIJRI_IMPLEMENTATION,
};

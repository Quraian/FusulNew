import { CalendarGroup, Color } from '@prisma/client';

import { ProspectiveCalendar, ProspectivePeriod } from '../types';
import { DEFAULT_GREGORIAN_IMPLEMENTATION } from '../helper';

const LONG_WEEKEND_AR = 'إجازة نهاية أسبوع مطولة';
const LONG_WEEKEND = 'Long weekend holiday';
const BEGINNING_OF_SCHOOL_AFTER_EID_FITR = 'بداية الدراسة بعد إجازة عيد الفطر';

const START_OF_THE_SECOND_SEMESTER_EN = 'Start of the Second Semester';
const START_OF_THE_SECOND_SEMESTER = 'بداية الدراسة للفصل الدراسي الثاني';

const BEGINNING_OF_THIRD_SEMESTER_EN = 'Beginning of the third semester';
const BEGINNING_OF_THIRD_SEMESTER = 'بداية الدراسة للطلاب للفصل الدراسي الثالث';

const BEGINNING_OF_THE_END_OF_YEAR_VACATION = 'بداية إجازة نهاية العام الدراسي';
const BEGINNING_OF_THE_END_OF_YEAR_VACATION_EN =
  'The beginning of the end-of-year vacation';

const periods: ProspectivePeriod[] = [
  {
    title: '1443',
    titleEn: '1443',
    events: [
      {
        title: 'بداية الدراسة للطلاب للفصل الدراسي الأول',
        titleEn: 'Beginning of the first semester',
        start: '2021-08-29T00:00:00+03:00',
      },
      {
        title: 'اجازة اليوم الوطني',
        titleEn: 'Saudi National Day Vacation',
        start: '2021-09-22T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2021-10-17T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2021-11-04T00:00:00+03:00',
      },
      {
        title: 'بداية اجازة الفصل الدراسي الأول',
        titleEn: 'Beginning of the first semester vacation',
        start: '2021-11-25T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة للطلاب للفصل الدراسي الثاني',
        titleEn: 'Beginning of the second semester',
        start: '2021-12-05T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2021-12-19T00:00:00+03:00',
      },
      {
        title: 'اجازة منتصف الفصل الدراسي الثاني',
        titleEn: 'Mid-semester break',
        start: '2022-01-06T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة بعد اجازة منتصف الفصل الدراسي الثاني',
        titleEn: 'Beginning of studies after the mid-term break',
        start: '2022-01-16T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2022-02-02T00:00:00+03:00',
      },
      {
        title: 'إجازة يوم التأسيس',
        titleEn: 'Founding Day holiday',
        start: '2022-02-22T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2022-02-23T00:00:00+03:00',
      },
      {
        title: 'بداية إجازة الفصل الدراسي الثاني للطلاب',
        titleEn: 'Beginning of the second semester vacation',
        start: '2022-03-10T00:00:00+03:00',
      },
      {
        title: BEGINNING_OF_THIRD_SEMESTER,
        titleEn: BEGINNING_OF_THIRD_SEMESTER_EN,
        start: '2022-03-20T00:00:00+03:00',
      },
      {
        title: 'بداية اجازة عيد الفطر',
        titleEn: 'The start of the Eid Al-Fitr holiday',
        start: '2022-04-25T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة بعد اجازة عيد الفطر',
        titleEn: 'The start of the study after the Eid Al-Fitr vacation',
        start: '2022-05-08T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2022-05-25T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2022-06-15T00:00:00+03:00',
      },
      {
        title: 'بداية اجازة نهاية العام الدراسي',
        titleEn: 'Beginning of vacation',
        start: '2022-06-30T00:00:00+03:00',
      },
    ],
  },
  {
    title: '1444',
    titleEn: '1444',
    events: [
      {
        title: 'بداية الدراسة للطلاب للفصل الدراسي الأول',
        titleEn: 'Beginning of the first semester',
        start: '2022-08-28T00:00:00+03:00',
      },
      {
        title: 'إجازة اليوم الوطني (يومي الاربعاء والخميس)',
        titleEn: 'Saudi National Day Vacation (Wednesday and Thursday)',
        start: '2022-09-21T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2022-10-16T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2022-11-10T00:00:00+03:00',
      },
      {
        title: 'بداية إجازة الفصل الدراسي الأول',
        titleEn: 'Beginning of the first semester vacation',
        start: '2022-11-24T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة للطلاب للفصل الدراسي الثاني',
        titleEn: 'Beginning of the second semester',
        start: '2022-12-04T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2022-12-18T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2023-01-15T00:00:00+03:00',
      },
      {
        title: 'إجازة يوم التأسيس (يومي الاربعاء والخميس)',
        titleEn: 'Founding Day holiday (Wednesday and Thursday)',
        start: '2023-02-22T00:00:00+03:00',
      },
      {
        title: 'بداية إجازة الفصل الدراسي الثاني',
        titleEn: 'Beginning of the second semester vacation',
        start: '2023-03-02T00:00:00+03:00',
      },
      {
        title: BEGINNING_OF_THIRD_SEMESTER,
        titleEn: BEGINNING_OF_THIRD_SEMESTER_EN,
        start: '2023-03-12T00:00:00+03:00',
      },
      {
        title: 'بداية إجازة عيد الفطر',
        titleEn: 'The start of the Eid al-Fitr holiday',
        start: '2023-04-13T00:00:00+03:00',
      },
      {
        title: BEGINNING_OF_SCHOOL_AFTER_EID_FITR,
        titleEn: 'The start of the study after the Eid Al-Fitr vacation',
        start: '2023-04-26T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2023-05-28T00:00:00+03:00',
      },
      {
        title: BEGINNING_OF_THE_END_OF_YEAR_VACATION,
        titleEn: BEGINNING_OF_THE_END_OF_YEAR_VACATION_EN,
        start: '2023-06-22T00:00:00+03:00',
      },
    ],
  },
  {
    title: '1445',
    titleEn: '1445',
    // TODO: check translation
    events: [
      {
        title:
          'عودة منسوبي التعليم والمدارس والمعاهد في جميع المراحل الدراسية ورياض الأطفال وبداية اختبارات الدور الثاني',
        titleEn:
          'Return of Education and School Staff, Institutes in all Educational Levels, and Kindergartens, and Start of Second Term Exams',
        start: '2023-08-13T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة للفصل الدراسي الأول',
        titleEn: 'Start of the First Semester',
        start: '2023-08-20T00:00:00+03:00',
      },
      {
        title: 'إجازة اليوم الوطني',
        titleEn: 'National Day Holiday',
        start: '2023-09-24T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2023-11-02T00:00:00+03:00',
      },
      {
        title: 'بداية إجازة الفصل الدراسي الأول',
        titleEn: 'Start of the First Semester Break',
        start: '2023-11-16T00:00:00+03:00',
      },
      {
        title: START_OF_THE_SECOND_SEMESTER,
        titleEn: START_OF_THE_SECOND_SEMESTER_EN,
        start: '2023-11-26T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2023-12-17T00:00:00+03:00',
      },
      {
        title: 'إجازة منتصف الفصل الدراسي الثاني',
        titleEn: 'Midterm Break for the Second Semester',
        start: '2024-01-04T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة بعد إجازة منتصف الفصل الدراسي الثاني',
        titleEn: 'Start of Classes after Midterm Break for the Second Semester',
        start: '2024-01-14T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2024-01-28T00:00:00+03:00',
      },
      {
        title: 'إجازة يوم التأسيس وبداية إجازة الفصل الدراسي الثاني',
        titleEn: 'Foundation Day Holiday and Start of Second Semester Break',
        start: '2024-02-22T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة للطلاب للفصل الدراسي الثالث',
        titleEn: 'Start of Classes for Students in the Third Semester',
        start: '2024-03-03T00:00:00+03:00',
      },
      {
        title: 'بداية إجازة عيد الفطر',
        titleEn: 'Start of Eid al-Fitr Holiday',
        start: '2024-03-28T00:00:00+03:00',
      },
      {
        title: BEGINNING_OF_SCHOOL_AFTER_EID_FITR,
        titleEn: 'Start of Classes after Eid al-Fitr Holiday',
        start: '2024-04-15T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2024-05-02T00:00:00+03:00',
      },
      {
        title: BEGINNING_OF_THE_END_OF_YEAR_VACATION,
        titleEn: BEGINNING_OF_THE_END_OF_YEAR_VACATION_EN,
        start: '2024-06-10T00:00:00+03:00',
      },
    ],
  },
  {
    title: '1447/1446',
    titleEn: '1447/1446',
    events: [
      {
        title: 'عودة المشرفين التربويين ومنسوبي مكاتب التعليم',
        titleEn: 'Return of educational supervisors and staff',
        start: '2024-08-04T00:00:00+03:00',
      },
      {
        title: 'عودة المعلمين',
        titleEn: 'Return of teachers',
        start: '2024-08-11T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة للعام الدراسي',
        titleEn: 'Beginning of the academic year',
        start: '2024-08-18T00:00:00+03:00',
      },
      {
        title: 'إجازة اليوم الوطني',
        titleEn: 'National Day Holiday',
        start: '2024-09-22T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2024-10-17T00:00:00+03:00',
      },
      {
        title: 'نهاية الفصل الدراسي الأول',
        titleEn: 'End of the first semester',
        start: '2024-11-07T00:00:00+03:00',
      },
      {
        title: START_OF_THE_SECOND_SEMESTER,
        titleEn: START_OF_THE_SECOND_SEMESTER_EN,
        start: '2024-11-17T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2024-12-11T00:00:00+03:00',
      },
      {
        title: 'إجازة منتصف العام الدراسي',
        titleEn: 'Mid-year school break',
        start: '2025-01-03T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة بعد إجازة منتصف العام الدراسي',
        titleEn: 'The beginning of school after the mid-year break',
        start: '2025-01-12T00:00:00+03:00',
      },
      {
        title: 'نهاية الفصل الدراسي الثاني',
        titleEn: 'End of the second semester',
        start: '2025-02-20T00:00:00+03:00',
      },
      {
        title: 'إجازة يوم التأسيس',
        titleEn: 'Foundation Day Holiday',
        start: '2025-02-23T00:00:00+03:00',
      },
      {
        title: 'إجازة الشتاء',
        titleEn: 'Winter Holiday',
        start: '2025-02-24T00:00:00+03:00',
      },
      {
        title: BEGINNING_OF_THIRD_SEMESTER,
        titleEn: BEGINNING_OF_THIRD_SEMESTER_EN,
        start: '2025-03-02T00:00:00+03:00',
      },
      {
        title: 'إجازة عيد الفطر',
        titleEn: 'Eid al-Fitr Holiday',
        start: '2025-03-20T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة بعد إجازة عيد الفطر',
        titleEn: 'Beginning of school after Eid al-Fitr',
        start: '2025-04-06T00:00:00+03:00',
      },
      {
        title: LONG_WEEKEND_AR,
        titleEn: LONG_WEEKEND,
        start: '2025-05-04T00:00:00+03:00',
      },
      {
        title: 'إجازة عيد الأضحى',
        titleEn: 'Eid al-Adha Holiday',
        start: '2025-05-30T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة بعد إجازة عيد الأضحى',
        titleEn: 'Beginning of school after Eid al-Adha',
        start: '2025-06-15T00:00:00+03:00',
      },
    ],
  },
  {
    title: '1446/1447',
    titleEn: '1446/1447',
    events: [
      {
        title: BEGINNING_OF_THE_END_OF_YEAR_VACATION,
        titleEn: BEGINNING_OF_THE_END_OF_YEAR_VACATION_EN,
        start: '2025-06-25T00:00:00+03:00',
      },
      {
        title: 'عودة المشرفين والهيئتين التعليمية والإدارية بالمدارس',
        titleEn:
          'Return of the supervisors and both the teaching and administrative staff to the schools',
        start: '2025-08-11T00:00:00+03:00',
      },
      {
        title: 'عودة المعلمين الممارسين للتدريس',
        titleEn: 'Return of teachers',
        start: '2025-08-16T00:00:00+03:00',
      },
      {
        title: 'بداية الدراسة للعام الدراسي',
        titleEn: 'Beginning of the academic year',
        start: '2025-08-23T00:00:00+03:00',
      },
    ],
  },
];

export const schoolCalendar: ProspectiveCalendar = {
  title: 'التقويم الدراسي',
  titleEn: 'School Calendar',
  description: 'التقويم الدراسي السعودي في التعليم العام',
  descriptionEn: 'Saudi academic calendar in general education',
  group: CalendarGroup.Education,
  color: Color.TEAL,
  periods,
  ...DEFAULT_GREGORIAN_IMPLEMENTATION,
};

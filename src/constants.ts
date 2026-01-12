import { MonthNames, DayNames } from './types';

/**
 * Afghan Shamsi month names in Dari, Pashto, and English
 * Based on zodiac signs used in Afghanistan
 */
export const MONTH_NAMES: MonthNames[] = [
  { dari: 'حمل', pashto: 'وری', english: 'Hamal' },
  { dari: 'ثور', pashto: 'غویی', english: 'Sawr' },
  { dari: 'جوزا', pashto: 'غبرګولی', english: 'Jawzā' },
  { dari: 'سرطان', pashto: 'چنګاښ', english: 'Saratān' },
  { dari: 'اسد', pashto: 'زمری', english: 'Asad' },
  { dari: 'سنبله', pashto: 'وږی', english: 'Sonbola' },
  { dari: 'میزان', pashto: 'تله', english: 'Mīzān' },
  { dari: 'عقرب', pashto: 'لړم', english: 'Aqrab' },
  { dari: 'قوس', pashto: 'لیندۍ', english: 'Qaws' },
  { dari: 'جدی', pashto: 'مرغومی', english: 'Jadi' },
  { dari: 'دلو', pashto: 'سلواغه', english: 'Dalw' },
  { dari: 'حوت', pashto: 'کب', english: 'Hūt' }
];

/**
 * Day names starting from Saturday (Afghan week starts on Saturday)
 */
export const DAY_NAMES: DayNames[] = [
  { dari: 'شنبه', pashto: 'خالی', english: 'Saturday' },
  { dari: 'یکشنبه', pashto: 'یکشنبه', english: 'Sunday' },
  { dari: 'دوشنبه', pashto: 'دوشنبه', english: 'Monday' },
  { dari: 'سه‌شنبه', pashto: 'درېشنبه', english: 'Tuesday' },
  { dari: 'چهارشنبه', pashto: 'څلورشنبه', english: 'Wednesday' },
  { dari: 'پنج‌شنبه', pashto: 'پینځشنبه', english: 'Thursday' },
  { dari: 'جمعه', pashto: 'جمعه', english: 'Friday' }
];

/**
 * Number of days in each Shamsi month
 * First 6 months have 31 days, next 5 have 30 days, last month has 29/30 days
 */
export const DAYS_IN_MONTH = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

/**
 * Epoch date for Shamsi calendar (March 21, 622 CE in Gregorian)
 */
export const SHAMSI_EPOCH = 1948321; // Julian Day Number

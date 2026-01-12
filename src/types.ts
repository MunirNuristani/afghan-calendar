/**
 * Supported languages for month and day names
 */
export type Language = 'dari' | 'pashto' | 'english';

/**
 * Shamsi (Solar Hijri) date object
 */
export interface ShamsiDate {
  year: number;
  month: number;
  day: number;
}

/**
 * Gregorian date object
 */
export interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

/**
 * Localized month names
 */
export interface MonthNames {
  dari: string;
  pashto: string;
  english: string;
}

/**
 * Localized day names
 */
export interface DayNames {
  dari: string;
  pashto: string;
  english: string;
}

/**
 * Formatted date string with all details
 */
export interface FormattedDate {
  year: number;
  month: number;
  day: number;
  monthName: MonthNames;
  dayOfWeek: number;
  dayName: DayNames;
}

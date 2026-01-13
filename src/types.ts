/**
 * Supported languages for month and day names
 */
export type Language = 'dari' | 'pashto' | 'english';

/**
 * Numeral system for formatting
 */
export type NumeralSystem = 'arabic' | 'persian';

/**
 * Month format options
 */
export type MonthFormat = 'numeric' | 'name';

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

/**
 * Flexible input types for date conversion
 */
export type DateInput = Date | string | GregorianDate;

/**
 * Options for formatting output
 */
export interface FormatOptions {
  /**
   * Format template string
   * - YYYY: 4-digit year
   * - YY: 2-digit year
   * - MM: 2-digit month
   * - M: month without leading zero
   * - MMM: month name
   * - DD: 2-digit day
   * - D: day without leading zero
   *
   * Examples:
   * - "YYYY-MM-DD" → 1404-01-01
   * - "DD-MMM-YYYY" → 01-حمل-1404
   * - "D/M/YYYY" → 1/1/1404
   */
  format?: string;

  /**
   * Numeral system (arabic: 0-9, persian: ۰-۹)
   */
  numerals?: NumeralSystem;

  /**
   * Language for month names (when using MMM token)
   */
  language?: Language;

  /**
   * Separator between date parts (default: "-")
   */
  separator?: string;
}

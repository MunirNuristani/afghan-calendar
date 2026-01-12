import { ShamsiDate, GregorianDate, Language, FormattedDate, MonthNames, DayNames } from './types';
import { MONTH_NAMES, DAY_NAMES } from './constants';
import { shamsiToGregorian } from './conversion';

/**
 * Get month name in specified language
 */
export function getMonthName(month: number, language: Language = 'english'): string {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Must be between 1 and 12.`);
  }

  return MONTH_NAMES[month - 1][language];
}

/**
 * Get all month names in specified language
 */
export function getAllMonthNames(language: Language = 'english'): string[] {
  return MONTH_NAMES.map(month => month[language]);
}

/**
 * Get day name in specified language
 * @param dayOfWeek - Day of week (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
 */
export function getDayName(dayOfWeek: number, language: Language = 'english'): string {
  if (dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error(`Invalid day of week: ${dayOfWeek}. Must be between 0 (Saturday) and 6 (Friday).`);
  }

  return DAY_NAMES[dayOfWeek][language];
}

/**
 * Get all day names in specified language
 */
export function getAllDayNames(language: Language = 'english'): string[] {
  return DAY_NAMES.map(day => day[language]);
}

/**
 * Get day of week for a Shamsi date
 * @returns Day of week (0 = Saturday, 1 = Sunday, ..., 6 = Friday)
 */
export function getDayOfWeek(shamsi: ShamsiDate): number {
  // Convert to Gregorian
  const gregorian = shamsiToGregorian(shamsi);

  // Use JavaScript Date to get day of week
  const date = new Date(gregorian.year, gregorian.month - 1, gregorian.day);
  const jsDay = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Convert to Afghan week (0 = Saturday)
  // JavaScript: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
  // Afghan: Sat=0, Sun=1, Mon=2, Tue=3, Wed=4, Thu=5, Fri=6
  return (jsDay + 1) % 7;
}

/**
 * Format a Shamsi date with all localized information
 */
export function formatShamsiDate(shamsi: ShamsiDate): FormattedDate {
  const monthName: MonthNames = {
    dari: MONTH_NAMES[shamsi.month - 1].dari,
    pashto: MONTH_NAMES[shamsi.month - 1].pashto,
    english: MONTH_NAMES[shamsi.month - 1].english
  };

  const dayOfWeek = getDayOfWeek(shamsi);
  const dayName: DayNames = {
    dari: DAY_NAMES[dayOfWeek].dari,
    pashto: DAY_NAMES[dayOfWeek].pashto,
    english: DAY_NAMES[dayOfWeek].english
  };

  return {
    year: shamsi.year,
    month: shamsi.month,
    day: shamsi.day,
    monthName,
    dayOfWeek,
    dayName
  };
}

/**
 * Format a date as a readable string
 */
export function formatDateString(shamsi: ShamsiDate, language: Language = 'english'): string {
  const formatted = formatShamsiDate(shamsi);

  return `${formatted.dayName[language]}, ${formatted.day} ${formatted.monthName[language]} ${formatted.year}`;
}

/**
 * Format a date in compact notation (YYYY-MM-DD)
 */
export function formatCompact(shamsi: ShamsiDate): string {
  const month = shamsi.month.toString().padStart(2, '0');
  const day = shamsi.day.toString().padStart(2, '0');
  return `${shamsi.year}-${month}-${day}`;
}

/**
 * Parse a compact date string (YYYY-MM-DD) to ShamsiDate
 */
export function parseCompact(dateString: string): ShamsiDate {
  const parts = dateString.split('-');
  if (parts.length !== 3) {
    throw new Error(`Invalid date format: ${dateString}. Expected format: YYYY-MM-DD`);
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error(`Invalid date values in: ${dateString}`);
  }

  return { year, month, day };
}

/**
 * Get month number from month name (case-insensitive, works with any language)
 */
export function getMonthNumber(monthName: string): number {
  const normalized = monthName.trim().toLowerCase();

  for (let i = 0; i < MONTH_NAMES.length; i++) {
    const names = MONTH_NAMES[i];
    if (
      names.dari === monthName ||
      names.pashto === monthName ||
      names.english.toLowerCase() === normalized
    ) {
      return i + 1;
    }
  }

  throw new Error(`Unknown month name: ${monthName}`);
}

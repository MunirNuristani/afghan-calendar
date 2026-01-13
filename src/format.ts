import { ShamsiDate, FormatOptions, NumeralSystem, Language } from './types';
import { getMonthName } from './utils';

/**
 * Map of Arabic numerals to Persian numerals
 */
const ARABIC_TO_PERSIAN: Record<string, string> = {
  '0': '۰',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹'
};

/**
 * Map of Persian numerals to Arabic numerals
 */
const PERSIAN_TO_ARABIC: Record<string, string> = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9'
};

/**
 * Convert Arabic numerals to Persian numerals
 */
export function toPersianNumerals(str: string): string {
  return str.replace(/[0-9]/g, (digit) => ARABIC_TO_PERSIAN[digit]);
}

/**
 * Convert Persian numerals to Arabic numerals
 */
export function toArabicNumerals(str: string): string {
  return str.replace(/[۰-۹]/g, (digit) => PERSIAN_TO_ARABIC[digit]);
}

/**
 * Convert a number to the specified numeral system
 */
export function convertNumerals(num: number | string, system: NumeralSystem): string {
  const str = num.toString();
  return system === 'persian' ? toPersianNumerals(str) : str;
}

/**
 * Pad a number with leading zeros
 */
function padNumber(num: number, width: number, system: NumeralSystem = 'arabic'): string {
  const str = num.toString().padStart(width, '0');
  return convertNumerals(str, system);
}

/**
 * Format a Shamsi date with flexible formatting options
 *
 * @param shamsi - Shamsi date object
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * // Basic format with Arabic numerals
 * formatShamsi({ year: 1404, month: 1, day: 1 }, { format: 'YYYY-MM-DD' })
 * // Returns: "1404-01-01"
 *
 * @example
 * // Persian numerals with month name
 * formatShamsi({ year: 1404, month: 1, day: 1 }, {
 *   format: 'DD-MMM-YYYY',
 *   numerals: 'persian',
 *   language: 'dari'
 * })
 * // Returns: "۰۱-حمل-۱۴۰۴"
 *
 * @example
 * // Custom separator
 * formatShamsi({ year: 1404, month: 1, day: 1 }, {
 *   format: 'D/M/YYYY',
 *   separator: '/'
 * })
 * // Returns: "1/1/1404"
 */
export function formatShamsi(
  shamsi: ShamsiDate,
  options: FormatOptions = {}
): string {
  const {
    format = 'YYYY-MM-DD',
    numerals = 'arabic',
    language = 'dari',
    separator = '-'
  } = options;

  let result = format;

  // Replace year tokens
  if (result.includes('YYYY')) {
    result = result.replace('YYYY', padNumber(shamsi.year, 4, numerals));
  } else if (result.includes('YY')) {
    const shortYear = shamsi.year % 100;
    result = result.replace('YY', padNumber(shortYear, 2, numerals));
  }

  // Replace month tokens
  if (result.includes('MMM')) {
    const monthName = getMonthName(shamsi.month, language);
    result = result.replace('MMM', monthName);
  } else if (result.includes('MM')) {
    result = result.replace('MM', padNumber(shamsi.month, 2, numerals));
  } else if (result.includes('M')) {
    result = result.replace('M', convertNumerals(shamsi.month, numerals));
  }

  // Replace day tokens
  if (result.includes('DD')) {
    result = result.replace('DD', padNumber(shamsi.day, 2, numerals));
  } else if (result.includes('D')) {
    result = result.replace('D', convertNumerals(shamsi.day, numerals));
  }

  return result;
}

/**
 * Format a Shamsi date with preset formats
 */
export const formatPresets = {
  /**
   * Standard format: 1404-01-01
   */
  standard: (date: ShamsiDate) =>
    formatShamsi(date, { format: 'YYYY-MM-DD', numerals: 'arabic' }),

  /**
   * Month name with Arabic numerals: 01-حمل-1404
   */
  monthNameArabic: (date: ShamsiDate, language: Language = 'dari') =>
    formatShamsi(date, { format: 'DD-MMM-YYYY', numerals: 'arabic', language }),

  /**
   * Persian numerals: ۰۱-۰۱-۱۴۰۴
   */
  persian: (date: ShamsiDate) =>
    formatShamsi(date, { format: 'YYYY-MM-DD', numerals: 'persian' }),

  /**
   * Month name with Persian numerals: ۰۱-حمل-۱۴۰۴
   */
  monthNamePersian: (date: ShamsiDate, language: Language = 'dari') =>
    formatShamsi(date, { format: 'DD-MMM-YYYY', numerals: 'persian', language }),

  /**
   * Compact without leading zeros: 1/1/1404
   */
  compact: (date: ShamsiDate) =>
    formatShamsi(date, { format: 'D/M/YYYY', separator: '/' }),

  /**
   * Long format with month name: 1 حمل 1404
   */
  long: (date: ShamsiDate, language: Language = 'dari') =>
    formatShamsi(date, { format: 'D MMM YYYY', language })
};

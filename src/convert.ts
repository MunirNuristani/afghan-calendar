import { DateInput, FormatOptions, ShamsiDate } from './types';
import { parseDate } from './parser';
import { gregorianToShamsi } from './conversion';
import { formatShamsi } from './format';

/**
 * Convert a Gregorian date to Shamsi (Afghan Calendar) with flexible input and output formats
 *
 * This is the main conversion function that accepts various input formats
 * and returns a formatted string based on your preferences.
 *
 * @param input - Gregorian date (Date object, string, or { year, month, day })
 * @param options - Formatting options for the output
 * @returns Formatted Shamsi date string
 *
 * @example
 * // From JavaScript Date, standard format
 * convert(new Date(2024, 2, 20))
 * // Returns: "1403-01-01"
 *
 * @example
 * // From ISO string with Persian numerals
 * convert('2024-03-20', { numerals: 'persian' })
 * // Returns: "۱۴۰۳-۰۱-۰۱"
 *
 * @example
 * // With month name in Dari
 * convert('2024-03-20', {
 *   format: 'DD-MMM-YYYY',
 *   language: 'dari'
 * })
 * // Returns: "01-حمل-1403"
 *
 * @example
 * // Persian numerals with month name
 * convert('2024-03-20', {
 *   format: 'DD-MMM-YYYY',
 *   numerals: 'persian',
 *   language: 'dari'
 * })
 * // Returns: "۰۱-حمل-۱۴۰۳"
 *
 * @example
 * // Compact format
 * convert('2024-03-20', { format: 'D/M/YYYY' })
 * // Returns: "1/1/1403"
 */
export function convert(
  input: DateInput,
  options?: FormatOptions
): string;

/**
 * Convert a Gregorian date to Shamsi date object
 *
 * @param input - Gregorian date (Date object, string, or { year, month, day })
 * @returns Shamsi date object
 *
 * @example
 * convert('2024-03-20', null)
 * // Returns: { year: 1403, month: 1, day: 1 }
 */
export function convert(
  input: DateInput,
  options: null
): ShamsiDate;

export function convert(
  input: DateInput,
  options?: FormatOptions | null
): string | ShamsiDate {
  // Parse the input to a GregorianDate object
  const gregorian = parseDate(input);

  // Convert to Shamsi
  const shamsi = gregorianToShamsi(gregorian);

  // If options is null, return the raw ShamsiDate object
  if (options === null) {
    return shamsi;
  }

  // Format and return the string
  return formatShamsi(shamsi, options || {});
}

/**
 * Convert Gregorian to Shamsi and return raw date object
 *
 * @param input - Gregorian date (Date object, string, or { year, month, day })
 * @returns Shamsi date object { year, month, day }
 *
 * @example
 * toShamsi('2024-03-20')
 * // Returns: { year: 1403, month: 1, day: 1 }
 *
 * @example
 * toShamsi(new Date(2024, 2, 20))
 * // Returns: { year: 1403, month: 1, day: 1 }
 */
export function toShamsi(input: DateInput): ShamsiDate {
  const gregorian = parseDate(input);
  return gregorianToShamsi(gregorian);
}

/**
 * Batch convert multiple dates
 *
 * @param inputs - Array of Gregorian dates
 * @param options - Formatting options (optional)
 * @returns Array of formatted Shamsi dates or ShamsiDate objects
 *
 * @example
 * convertBatch([
 *   '2024-03-20',
 *   '2024-06-15',
 *   new Date(2024, 11, 31)
 * ], { format: 'DD-MMM-YYYY', language: 'dari' })
 * // Returns: ["01-حمل-1403", "26-جوزا-1403", "11-جدی-1403"]
 */
export function convertBatch(
  inputs: DateInput[],
  options?: FormatOptions | null
): (string | ShamsiDate)[] {
  return inputs.map(input => convert(input, options as any));
}

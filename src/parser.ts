import { GregorianDate, DateInput } from './types';
import { toArabicNumerals } from './format';

/**
 * Parse a date string in various formats
 */
function parseDateString(dateStr: string): GregorianDate {
  // Normalize Persian numerals to Arabic
  const normalized = toArabicNumerals(dateStr.trim());

  // Try ISO format: YYYY-MM-DD or YYYY/MM/DD
  const isoMatch = normalized.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
  if (isoMatch) {
    return {
      year: parseInt(isoMatch[1], 10),
      month: parseInt(isoMatch[2], 10),
      day: parseInt(isoMatch[3], 10)
    };
  }

  // Try DD-MM-YYYY or DD/MM/YYYY
  const ddmmyyyyMatch = normalized.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (ddmmyyyyMatch) {
    return {
      year: parseInt(ddmmyyyyMatch[3], 10),
      month: parseInt(ddmmyyyyMatch[2], 10),
      day: parseInt(ddmmyyyyMatch[1], 10)
    };
  }

  // Try MM-DD-YYYY or MM/DD/YYYY
  const mmddyyyyMatch = normalized.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (mmddyyyyMatch) {
    // This is ambiguous with DD-MM-YYYY, so we check if day > 12
    const first = parseInt(mmddyyyyMatch[1], 10);
    const second = parseInt(mmddyyyyMatch[2], 10);

    if (first > 12) {
      // First number is day
      return {
        year: parseInt(mmddyyyyMatch[3], 10),
        month: second,
        day: first
      };
    } else if (second > 12) {
      // Second number is day
      return {
        year: parseInt(mmddyyyyMatch[3], 10),
        month: first,
        day: second
      };
    }
    // If both <= 12, assume MM-DD-YYYY (American format)
    return {
      year: parseInt(mmddyyyyMatch[3], 10),
      month: first,
      day: second
    };
  }

  // Try compact format: YYYYMMDD
  const compactMatch = normalized.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (compactMatch) {
    return {
      year: parseInt(compactMatch[1], 10),
      month: parseInt(compactMatch[2], 10),
      day: parseInt(compactMatch[3], 10)
    };
  }

  throw new Error(
    `Unable to parse date string: "${dateStr}". ` +
    'Supported formats: YYYY-MM-DD, DD-MM-YYYY, MM-DD-YYYY, YYYYMMDD'
  );
}

/**
 * Parse a JavaScript Date object to GregorianDate
 */
function parseJSDate(date: Date): GregorianDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // JavaScript months are 0-indexed
    day: date.getDate()
  };
}

/**
 * Parse various date input formats into a GregorianDate object
 *
 * @param input - Date input (Date object, string, or GregorianDate object)
 * @returns Parsed GregorianDate object
 *
 * @example
 * // From JavaScript Date
 * parseDate(new Date(2024, 2, 20)) // { year: 2024, month: 3, day: 20 }
 *
 * @example
 * // From ISO string
 * parseDate('2024-03-20') // { year: 2024, month: 3, day: 20 }
 *
 * @example
 * // From Persian numerals
 * parseDate('۲۰۲۴-۰۳-۲۰') // { year: 2024, month: 3, day: 20 }
 *
 * @example
 * // From object
 * parseDate({ year: 2024, month: 3, day: 20 }) // { year: 2024, month: 3, day: 20 }
 */
export function parseDate(input: DateInput): GregorianDate {
  // Handle Date object
  if (input instanceof Date) {
    return parseJSDate(input);
  }

  // Handle string
  if (typeof input === 'string') {
    return parseDateString(input);
  }

  // Handle GregorianDate object
  if (
    typeof input === 'object' &&
    'year' in input &&
    'month' in input &&
    'day' in input
  ) {
    return {
      year: input.year,
      month: input.month,
      day: input.day
    };
  }

  throw new Error(
    'Invalid date input. Expected Date object, string, or { year, month, day } object.'
  );
}

/**
 * Try to parse a date input, returning null if parsing fails
 */
export function tryParseDate(input: DateInput): GregorianDate | null {
  try {
    return parseDate(input);
  } catch {
    return null;
  }
}

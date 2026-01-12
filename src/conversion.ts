import { ShamsiDate, GregorianDate } from './types';
import { DAYS_IN_MONTH } from './constants';

/**
 * Check if a Gregorian year is a leap year
 */
function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Check if a Shamsi year is a leap year
 * Uses the 33-year cycle algorithm
 */
function isShamsiLeapYear(year: number): boolean {
  const breaks = [1, 5, 9, 13, 17, 22, 26, 30];
  const cycle = year % 33;
  return breaks.includes(cycle);
}

/**
 * Get number of days in a Shamsi month
 */
function getDaysInShamsiMonth(year: number, month: number): number {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Must be between 1 and 12.`);
  }

  if (month === 12 && isShamsiLeapYear(year)) {
    return 30; // Last month has 30 days in leap years
  }

  return DAYS_IN_MONTH[month - 1];
}

/**
 * Convert Gregorian date to Julian Day Number
 */
function gregorianToJulianDay(year: number, month: number, day: number): number {
  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;

  return day + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) +
    Math.floor(y / 400) - 32045;
}

/**
 * Convert Julian Day Number to Gregorian date
 */
function julianDayToGregorian(jd: number): GregorianDate {
  let a = jd + 32044;
  let b = Math.floor((4 * a + 3) / 146097);
  let c = a - Math.floor((146097 * b) / 4);
  let d = Math.floor((4 * c + 3) / 1461);
  let e = c - Math.floor((1461 * d) / 4);
  let m = Math.floor((5 * e + 2) / 153);

  let day = e - Math.floor((153 * m + 2) / 5) + 1;
  let month = m + 3 - 12 * Math.floor(m / 10);
  let year = 100 * b + d - 4800 + Math.floor(m / 10);

  return { year, month, day };
}

/**
 * Convert Shamsi date to Julian Day Number
 * Based on the algorithm by Kazimierz M. Borkowski
 */
function shamsiToJulianDay(year: number, month: number, day: number): number {
  // Shamsi epoch: March 22, 622 CE (Julian Day 1948320)
  const SHAMSI_EPOCH = 1948320;

  // Calculate days from months
  let monthDays = 0;
  if (month <= 7) {
    monthDays = (month - 1) * 31;
  } else {
    monthDays = 6 * 31 + (month - 7) * 30;
  }

  // Calculate total days from years
  let y = year - 1;
  let yearDays = 365 * y;

  // Add leap days based on 33-year cycle
  // In each 33-year cycle: years 1,5,9,13,17,22,26,30 are leap (8 leap years per cycle)
  let cycles = Math.floor(y / 33);
  yearDays += cycles * 8; // 8 leap days per 33-year cycle

  // Add leap days for remaining years in current cycle
  let remainingYears = y % 33;
  const leapPositions = [1, 5, 9, 13, 17, 22, 26, 30];
  for (let i = 0; i < leapPositions.length; i++) {
    if (leapPositions[i] <= remainingYears) {
      yearDays++;
    }
  }

  return SHAMSI_EPOCH + yearDays + monthDays + day - 1;
}

/**
 * Convert Julian Day Number to Shamsi date
 */
function julianDayToShamsi(jd: number): ShamsiDate {
  const SHAMSI_EPOCH = 1948320;

  // Days since Shamsi epoch
  let daysSinceEpoch = jd - SHAMSI_EPOCH;

  // Estimate year using 33-year cycles (each cycle has 12053 days = 33*365 + 8 leap days)
  const daysPerCycle = 12053;
  let cycles = Math.floor(daysSinceEpoch / daysPerCycle);
  let remainingDays = daysSinceEpoch - cycles * daysPerCycle;

  // Find the year within the current cycle
  let year = cycles * 33 + 1;
  const leapPositions = [1, 5, 9, 13, 17, 22, 26, 30];

  while (remainingDays >= 365) {
    let yearInCycle = (year - 1) % 33 + 1;
    let daysInYear = leapPositions.includes(yearInCycle) ? 366 : 365;

    if (remainingDays >= daysInYear) {
      remainingDays -= daysInYear;
      year++;
    } else {
      break;
    }
  }

  // Now find month and day from remainingDays
  let month = 1;
  let day = remainingDays + 1;

  // First 6 months have 31 days each
  if (day <= 186) {
    month = Math.floor((day - 1) / 31) + 1;
    day = ((day - 1) % 31) + 1;
  } else {
    // Months 7-12 have 30 days each (except month 12 in leap years has 30)
    let daysAfterMonth6 = day - 186;
    month = Math.floor((daysAfterMonth6 - 1) / 30) + 7;
    day = ((daysAfterMonth6 - 1) % 30) + 1;
  }

  return { year, month, day };
}

/**
 * Convert Shamsi date to Gregorian date
 */
export function shamsiToGregorian(shamsi: ShamsiDate): GregorianDate {
  validateShamsiDate(shamsi);
  const jd = shamsiToJulianDay(shamsi.year, shamsi.month, shamsi.day);
  return julianDayToGregorian(jd);
}

/**
 * Convert Gregorian date to Shamsi date
 */
export function gregorianToShamsi(gregorian: GregorianDate): ShamsiDate {
  validateGregorianDate(gregorian);
  const jd = gregorianToJulianDay(gregorian.year, gregorian.month, gregorian.day);
  return julianDayToShamsi(jd);
}

/**
 * Get today's date in both Shamsi and Gregorian calendars
 */
export function getToday(): { shamsi: ShamsiDate; gregorian: GregorianDate } {
  const now = new Date();
  const gregorian: GregorianDate = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
  const shamsi = gregorianToShamsi(gregorian);

  return { shamsi, gregorian };
}

/**
 * Validate Shamsi date
 */
function validateShamsiDate(date: ShamsiDate): void {
  const { year, month, day } = date;

  if (month < 1 || month > 12) {
    throw new Error(`Invalid Shamsi month: ${month}. Must be between 1 and 12.`);
  }

  const daysInMonth = getDaysInShamsiMonth(year, month);
  if (day < 1 || day > daysInMonth) {
    throw new Error(`Invalid Shamsi day: ${day}. Month ${month} has ${daysInMonth} days.`);
  }

  if (year < 1 || year > 3000) {
    throw new Error(`Invalid Shamsi year: ${year}. Must be between 1 and 3000.`);
  }
}

/**
 * Validate Gregorian date
 */
function validateGregorianDate(date: GregorianDate): void {
  const { year, month, day } = date;

  if (month < 1 || month > 12) {
    throw new Error(`Invalid Gregorian month: ${month}. Must be between 1 and 12.`);
  }

  const daysInMonth = [31, isGregorianLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day < 1 || day > daysInMonth[month - 1]) {
    throw new Error(`Invalid Gregorian day: ${day}. Month ${month} has ${daysInMonth[month - 1]} days.`);
  }

  if (year < 1 || year > 3000) {
    throw new Error(`Invalid Gregorian year: ${year}. Must be between 1 and 3000.`);
  }
}

/**
 * Check if a year is a leap year (works for both Shamsi and Gregorian)
 */
export function isLeapYear(year: number, calendar: 'shamsi' | 'gregorian' = 'shamsi'): boolean {
  return calendar === 'shamsi' ? isShamsiLeapYear(year) : isGregorianLeapYear(year);
}

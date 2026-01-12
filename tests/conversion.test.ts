import {
  shamsiToGregorian,
  gregorianToShamsi,
  getToday,
  isLeapYear
} from '../src';

describe('Date Conversion', () => {
  describe('shamsiToGregorian', () => {
    it('should convert Nowruz (Afghan New Year) correctly', () => {
      const shamsi = { year: 1403, month: 1, day: 1 };
      const gregorian = shamsiToGregorian(shamsi);

      expect(gregorian).toEqual({ year: 2024, month: 3, day: 20 });
    });

    it('should convert mid-year date correctly', () => {
      const shamsi = { year: 1403, month: 6, day: 15 };
      const gregorian = shamsiToGregorian(shamsi);

      expect(gregorian).toEqual({ year: 2024, month: 9, day: 5 });
    });

    it('should convert end of year date correctly', () => {
      const shamsi = { year: 1403, month: 12, day: 29 };
      const gregorian = shamsiToGregorian(shamsi);

      expect(gregorian).toEqual({ year: 2025, month: 3, day: 19 });
    });

    it('should handle leap year correctly', () => {
      const shamsi = { year: 1403, month: 12, day: 30 };
      const gregorian = shamsiToGregorian(shamsi);

      expect(gregorian).toEqual({ year: 2025, month: 3, day: 20 });
    });

    it('should throw error for invalid month', () => {
      expect(() => {
        shamsiToGregorian({ year: 1403, month: 13, day: 1 });
      }).toThrow('Invalid Shamsi month');
    });

    it('should throw error for invalid day', () => {
      expect(() => {
        shamsiToGregorian({ year: 1403, month: 7, day: 31 });
      }).toThrow('Invalid Shamsi day');
    });
  });

  describe('gregorianToShamsi', () => {
    it('should convert March 21, 2024 to Nowruz 1403', () => {
      const gregorian = { year: 2024, month: 3, day: 20 };
      const shamsi = gregorianToShamsi(gregorian);

      expect(shamsi).toEqual({ year: 1403, month: 1, day: 1 });
    });

    it('should convert current year correctly', () => {
      const gregorian = { year: 2025, month: 1, day: 8 };
      const shamsi = gregorianToShamsi(gregorian);

      expect(shamsi).toEqual({ year: 1403, month: 10, day: 19 });
    });

    it('should be inverse of shamsiToGregorian', () => {
      const shamsi1 = { year: 1403, month: 5, day: 15 };
      const gregorian = shamsiToGregorian(shamsi1);
      const shamsi2 = gregorianToShamsi(gregorian);

      expect(shamsi2).toEqual(shamsi1);
    });
  });

  describe('getToday', () => {
    it('should return today\'s date in both calendars', () => {
      const result = getToday();

      expect(result).toHaveProperty('shamsi');
      expect(result).toHaveProperty('gregorian');
      expect(result.shamsi).toHaveProperty('year');
      expect(result.shamsi).toHaveProperty('month');
      expect(result.shamsi).toHaveProperty('day');
      expect(result.gregorian).toHaveProperty('year');
      expect(result.gregorian).toHaveProperty('month');
      expect(result.gregorian).toHaveProperty('day');
    });
  });

  describe('isLeapYear', () => {
    it('should correctly identify Shamsi leap years', () => {
      expect(isLeapYear(1403, 'shamsi')).toBe(true); // 1403 % 33 = 17 (leap)
      expect(isLeapYear(1404, 'shamsi')).toBe(false); // 1404 % 33 = 18 (not leap)
      expect(isLeapYear(1408, 'shamsi')).toBe(true); // 1408 % 33 = 22 (leap)
    });

    it('should correctly identify Gregorian leap years', () => {
      expect(isLeapYear(2024, 'gregorian')).toBe(true);
      expect(isLeapYear(2025, 'gregorian')).toBe(false);
      expect(isLeapYear(2000, 'gregorian')).toBe(true);
      expect(isLeapYear(1900, 'gregorian')).toBe(false);
    });
  });
});

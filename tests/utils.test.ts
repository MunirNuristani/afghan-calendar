import {
  getMonthName,
  getAllMonthNames,
  getDayName,
  getAllDayNames,
  formatShamsiDate,
  formatDateString,
  formatCompact,
  parseCompact,
  getMonthNumber
} from '../src';

describe('Utility Functions', () => {
  describe('getMonthName', () => {
    it('should return correct Dari month name', () => {
      expect(getMonthName(1, 'dari')).toBe('حمل');
      expect(getMonthName(6, 'dari')).toBe('سنبله');
      expect(getMonthName(12, 'dari')).toBe('حوت');
    });

    it('should return correct Pashto month name', () => {
      expect(getMonthName(1, 'pashto')).toBe('وری');
      expect(getMonthName(6, 'pashto')).toBe('وږی');
      expect(getMonthName(12, 'pashto')).toBe('کب');
    });

    it('should return correct English month name', () => {
      expect(getMonthName(1, 'english')).toBe('Hamal');
      expect(getMonthName(6, 'english')).toBe('Sonbola');
      expect(getMonthName(12, 'english')).toBe('Hūt');
    });

    it('should default to English', () => {
      expect(getMonthName(1)).toBe('Hamal');
    });

    it('should throw error for invalid month', () => {
      expect(() => getMonthName(0)).toThrow('Invalid month');
      expect(() => getMonthName(13)).toThrow('Invalid month');
    });
  });

  describe('getAllMonthNames', () => {
    it('should return all 12 month names', () => {
      const names = getAllMonthNames('english');
      expect(names).toHaveLength(12);
      expect(names[0]).toBe('Hamal');
      expect(names[11]).toBe('Hūt');
    });
  });

  describe('getDayName', () => {
    it('should return correct day names', () => {
      expect(getDayName(0, 'english')).toBe('Saturday');
      expect(getDayName(1, 'english')).toBe('Sunday');
      expect(getDayName(6, 'english')).toBe('Friday');
    });

    it('should return correct Dari day names', () => {
      expect(getDayName(0, 'dari')).toBe('شنبه');
      expect(getDayName(6, 'dari')).toBe('جمعه');
    });
  });

  describe('formatShamsiDate', () => {
    it('should format date with all localized information', () => {
      const formatted = formatShamsiDate({ year: 1403, month: 1, day: 1 });

      expect(formatted.year).toBe(1403);
      expect(formatted.month).toBe(1);
      expect(formatted.day).toBe(1);
      expect(formatted.monthName.english).toBe('Hamal');
      expect(formatted.monthName.dari).toBe('حمل');
      expect(formatted.dayOfWeek).toBeGreaterThanOrEqual(0);
      expect(formatted.dayOfWeek).toBeLessThanOrEqual(6);
    });
  });

  describe('formatDateString', () => {
    it('should format date as readable string in English', () => {
      const result = formatDateString({ year: 1403, month: 1, day: 1 }, 'english');
      expect(result).toContain('1');
      expect(result).toContain('Hamal');
      expect(result).toContain('1403');
    });
  });

  describe('formatCompact and parseCompact', () => {
    it('should format date in compact notation', () => {
      const compact = formatCompact({ year: 1403, month: 1, day: 1 });
      expect(compact).toBe('1403-01-01');
    });

    it('should parse compact date string', () => {
      const date = parseCompact('1403-01-01');
      expect(date).toEqual({ year: 1403, month: 1, day: 1 });
    });

    it('should be reversible', () => {
      const original = { year: 1403, month: 6, day: 15 };
      const compact = formatCompact(original);
      const parsed = parseCompact(compact);
      expect(parsed).toEqual(original);
    });

    it('should throw error for invalid format', () => {
      expect(() => parseCompact('invalid')).toThrow('Invalid date format');
      expect(() => parseCompact('1403-01')).toThrow('Invalid date format');
    });
  });

  describe('getMonthNumber', () => {
    it('should get month number from English name', () => {
      expect(getMonthNumber('Hamal')).toBe(1);
      expect(getMonthNumber('hamal')).toBe(1);
      expect(getMonthNumber('Hūt')).toBe(12);
    });

    it('should get month number from Dari name', () => {
      expect(getMonthNumber('حمل')).toBe(1);
      expect(getMonthNumber('حوت')).toBe(12);
    });

    it('should throw error for unknown month name', () => {
      expect(() => getMonthNumber('InvalidMonth')).toThrow('Unknown month name');
    });
  });
});

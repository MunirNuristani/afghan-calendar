import {
  convert,
  toShamsi,
  convertBatch,
  formatShamsi,
  formatPresets,
  toPersianNumerals,
  toArabicNumerals,
  parseDate
} from '../src/index';

describe('Numeral Conversion', () => {
  test('converts Arabic numerals to Persian', () => {
    expect(toPersianNumerals('0123456789')).toBe('۰۱۲۳۴۵۶۷۸۹');
    expect(toPersianNumerals('1403-01-01')).toBe('۱۴۰۳-۰۱-۰۱');
  });

  test('converts Persian numerals to Arabic', () => {
    expect(toArabicNumerals('۰۱۲۳۴۵۶۷۸۹')).toBe('0123456789');
    expect(toArabicNumerals('۱۴۰۳-۰۱-۰۱')).toBe('1403-01-01');
  });

  test('handles mixed content', () => {
    expect(toPersianNumerals('Year 1403')).toBe('Year ۱۴۰۳');
    expect(toArabicNumerals('سال ۱۴۰۳')).toBe('سال 1403');
  });
});

describe('Date Parsing', () => {
  const expected = { year: 2024, month: 3, day: 20 };

  test('parses JavaScript Date objects', () => {
    const date = new Date(2024, 2, 20); // Note: month is 0-indexed
    expect(parseDate(date)).toEqual(expected);
  });

  test('parses ISO format strings', () => {
    expect(parseDate('2024-03-20')).toEqual(expected);
    expect(parseDate('2024/03/20')).toEqual(expected);
  });

  test('parses Persian numeral strings', () => {
    expect(parseDate('۲۰۲۴-۰۳-۲۰')).toEqual(expected);
    expect(parseDate('۲۰۲۴/۰۳/۲۰')).toEqual(expected);
  });

  test('parses DD-MM-YYYY format', () => {
    expect(parseDate('20-03-2024')).toEqual(expected);
    expect(parseDate('20/03/2024')).toEqual(expected);
  });

  test('parses compact format', () => {
    expect(parseDate('20240320')).toEqual(expected);
  });

  test('parses date objects directly', () => {
    expect(parseDate(expected)).toEqual(expected);
  });

  test('throws error for invalid format', () => {
    expect(() => parseDate('invalid')).toThrow();
  });
});

describe('Flexible Conversion - convert()', () => {
  const testDate = '2024-03-20'; // 1403-01-01 in Shamsi

  test('converts with default format', () => {
    expect(convert(testDate)).toBe('1403-01-01');
  });

  test('converts with Persian numerals', () => {
    expect(convert(testDate, { numerals: 'persian' })).toBe('۱۴۰۳-۰۱-۰۱');
  });

  test('converts with month name in Dari', () => {
    expect(convert(testDate, {
      format: 'DD-MMM-YYYY',
      language: 'dari'
    })).toBe('01-حمل-1403');
  });

  test('converts with month name in Pashto', () => {
    expect(convert(testDate, {
      format: 'DD-MMM-YYYY',
      language: 'pashto'
    })).toBe('01-وری-1403');
  });

  test('converts with month name in English', () => {
    expect(convert(testDate, {
      format: 'DD-MMM-YYYY',
      language: 'english'
    })).toBe('01-Hamal-1403');
  });

  test('converts with Persian numerals and month name', () => {
    expect(convert(testDate, {
      format: 'DD-MMM-YYYY',
      numerals: 'persian',
      language: 'dari'
    })).toBe('۰۱-حمل-۱۴۰۳');
  });

  test('converts with compact format', () => {
    expect(convert(testDate, { format: 'D/M/YYYY' })).toBe('1/1/1403');
  });

  test('converts with long format', () => {
    expect(convert(testDate, {
      format: 'D MMM YYYY',
      language: 'dari'
    })).toBe('1 حمل 1403');
  });

  test('returns ShamsiDate object when options is null', () => {
    expect(convert(testDate, null)).toEqual({
      year: 1403,
      month: 1,
      day: 1
    });
  });

  test('accepts Date objects', () => {
    const date = new Date(2024, 2, 20);
    expect(convert(date)).toBe('1403-01-01');
  });

  test('accepts GregorianDate objects', () => {
    expect(convert({ year: 2024, month: 3, day: 20 })).toBe('1403-01-01');
  });
});

describe('toShamsi()', () => {
  test('converts to ShamsiDate object', () => {
    expect(toShamsi('2024-03-20')).toEqual({
      year: 1403,
      month: 1,
      day: 1
    });
  });

  test('accepts various input formats', () => {
    const expected = { year: 1403, month: 1, day: 1 };
    expect(toShamsi(new Date(2024, 2, 20))).toEqual(expected);
    expect(toShamsi({ year: 2024, month: 3, day: 20 })).toEqual(expected);
    expect(toShamsi('۲۰۲۴-۰۳-۲۰')).toEqual(expected);
  });
});

describe('formatShamsi()', () => {
  const shamsiDate = { year: 1403, month: 1, day: 1 };

  test('formats with YYYY-MM-DD', () => {
    expect(formatShamsi(shamsiDate, { format: 'YYYY-MM-DD' })).toBe('1403-01-01');
  });

  test('formats with YY-MM-DD', () => {
    expect(formatShamsi(shamsiDate, { format: 'YY-MM-DD' })).toBe('03-01-01');
  });

  test('formats with DD-MM-YYYY', () => {
    expect(formatShamsi(shamsiDate, { format: 'DD-MM-YYYY' })).toBe('01-01-1403');
  });

  test('formats with D/M/YYYY', () => {
    expect(formatShamsi(shamsiDate, { format: 'D/M/YYYY' })).toBe('1/1/1403');
  });

  test('formats with month name', () => {
    expect(formatShamsi(shamsiDate, {
      format: 'DD MMM YYYY',
      language: 'dari'
    })).toBe('01 حمل 1403');
  });

  test('formats with Persian numerals', () => {
    expect(formatShamsi(shamsiDate, {
      format: 'YYYY-MM-DD',
      numerals: 'persian'
    })).toBe('۱۴۰۳-۰۱-۰۱');
  });

  test('formats double-digit days and months correctly', () => {
    expect(formatShamsi({ year: 1403, month: 12, day: 29 }, {
      format: 'DD-MM-YYYY'
    })).toBe('29-12-1403');
  });
});

describe('Format Presets', () => {
  const shamsiDate = { year: 1403, month: 1, day: 1 };

  test('standard preset', () => {
    expect(formatPresets.standard(shamsiDate)).toBe('1403-01-01');
  });

  test('monthNameArabic preset', () => {
    expect(formatPresets.monthNameArabic(shamsiDate, 'dari')).toBe('01-حمل-1403');
  });

  test('persian preset', () => {
    expect(formatPresets.persian(shamsiDate)).toBe('۱۴۰۳-۰۱-۰۱');
  });

  test('monthNamePersian preset', () => {
    expect(formatPresets.monthNamePersian(shamsiDate, 'dari')).toBe('۰۱-حمل-۱۴۰۳');
  });

  test('compact preset', () => {
    expect(formatPresets.compact(shamsiDate)).toBe('1/1/1403');
  });

  test('long preset', () => {
    expect(formatPresets.long(shamsiDate, 'dari')).toBe('1 حمل 1403');
  });
});

describe('Batch Conversion', () => {
  const dates = [
    '2024-03-20',
    '2024-06-15',
    new Date(2024, 11, 31)
  ];

  test('converts multiple dates with formatting', () => {
    const results = convertBatch(dates, {
      format: 'DD-MMM-YYYY',
      language: 'dari'
    });
    expect(results).toEqual([
      '01-حمل-1403',
      '26-جوزا-1403',
      '11-جدی-1403'
    ]);
  });

  test('converts multiple dates to objects', () => {
    const results = convertBatch(dates, null);
    expect(results).toEqual([
      { year: 1403, month: 1, day: 1 },
      { year: 1403, month: 3, day: 26 },
      { year: 1403, month: 10, day: 11 }
    ]);
  });
});

describe('Real-world Examples', () => {
  test('example 1: standard format', () => {
    expect(convert('2024-03-20')).toBe('1403-01-01');
  });

  test('example 2: month name with Arabic numerals', () => {
    expect(convert('2024-03-20', {
      format: 'DD-MMM-YYYY',
      language: 'dari'
    })).toBe('01-حمل-1403');
  });

  test('example 3: Persian numerals', () => {
    expect(convert('2024-03-20', {
      numerals: 'persian'
    })).toBe('۱۴۰۳-۰۱-۰۱');
  });

  test('example 4: Persian numerals with month name', () => {
    expect(convert('2024-03-20', {
      format: 'DD-MMM-YYYY',
      numerals: 'persian',
      language: 'dari'
    })).toBe('۰۱-حمل-۱۴۰۳');
  });

  test('example 5: input with Persian numerals', () => {
    expect(convert('۲۰۲۴-۰۳-۲۰', {
      format: 'DD-MMM-YYYY',
      numerals: 'persian',
      language: 'pashto'
    })).toBe('۰۱-وری-۱۴۰۳');
  });
});

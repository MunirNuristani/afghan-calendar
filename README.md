# Afghan Calendar 🇦🇫

A lightweight, zero-dependency JavaScript/TypeScript library for converting between Afghan Shamsi (Solar Hijri) and Gregorian calendars with authentic Dari and Pashto month names.

[![npm version](https://img.shields.io/npm/v/afghan-calendar.svg)](https://www.npmjs.com/package/afghan-calendar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Library?

While Afghanistan and Iran both use the Solar Hijri calendar system, **the month names are completely different**. Most calendar libraries use Iranian/Persian names, making them confusing for Afghan users. This library uses authentic Afghan month names in Dari and Pashto.

### Month Name Comparison

| Month | 🇦🇫 Afghan (Dari) | 🇦🇫 Afghan (Pashto) | 🇮🇷 Iranian (Persian) |
|-------|------------------|---------------------|---------------------|
| 1     | حمل (Hamal)      | وری (Wray)          | فروردین (Farvardin) |
| 2     | ثور (Sawr)       | غویی (Ghoye)        | اردیبهشت (Ordibehesht) |
| 3     | جوزا (Jawzā)     | غبرګولی (Ghbargole) | خرداد (Khordad) |
| ...   | ...              | ...                 | ... |

## Features

✅ **Flexible input formats** - accepts Date objects, strings (including Persian numerals), or date objects
✅ **Customizable output** - format dates exactly how you need them
✅ **Numeral systems** - switch between Arabic (0-9) and Persian (۰-۹) numerals
✅ **Accurate conversions** between Afghan Shamsi and Gregorian calendars
✅ **Authentic Afghan month names** in Dari and Pashto
✅ **Zero dependencies** - lightweight and fast
✅ **TypeScript support** with full type definitions
✅ **Well-tested** with comprehensive test coverage (72+ tests)
✅ **Easy to use** functional API
✅ **Works everywhere** - Node.js, browsers, React Native

## Installation

```bash
npm install afghan-calendar
```

```bash
yarn add afghan-calendar
```

```bash
pnpm add afghan-calendar
```

## Quick Start

### New Flexible API (Recommended)

The flexible API accepts any date format as input and lets you customize the output format:

```typescript
import { convert } from 'afghan-calendar';

// Basic conversion - accepts Date objects, strings, or date objects
convert('2024-03-20');                    // "1403-01-01"
convert(new Date(2024, 2, 20));           // "1403-01-01"
convert({ year: 2024, month: 3, day: 20 }); // "1403-01-01"

// With Persian numerals (۰-۹)
convert('2024-03-20', { numerals: 'persian' });
// "۱۴۰۳-۰۱-۰۱"

// With month name in Dari
convert('2024-03-20', {
  format: 'DD-MMM-YYYY',
  language: 'dari'
});
// "01-حمل-1403"

// Persian numerals with month name
convert('2024-03-20', {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'dari'
});
// "۰۱-حمل-۱۴۰۳"

// Input can also have Persian numerals!
convert('۲۰۲۴-۰۳-۲۰', {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'pashto'
});
// "۰۱-وری-۱۴۰۳"

// Compact format
convert('2024-03-20', { format: 'D/M/YYYY' });
// "1/1/1403"
```

### Classic API (Still Supported)

```typescript
import {
  shamsiToGregorian,
  gregorianToShamsi,
  getToday,
  getMonthName,
  formatDateString
} from 'afghan-calendar';

// Convert Shamsi to Gregorian
const gregorian = shamsiToGregorian({ year: 1403, month: 1, day: 1 });
console.log(gregorian); // { year: 2024, month: 3, day: 20 }

// Convert Gregorian to Shamsi
const shamsi = gregorianToShamsi({ year: 2024, month: 3, day: 20 });
console.log(shamsi); // { year: 1403, month: 1, day: 1 }

// Get today's date in both calendars
const today = getToday();
console.log(today);
// {
//   shamsi: { year: 1403, month: 10, day: 22 },
//   gregorian: { year: 2025, month: 1, day: 12 }
// }

// Get month names in different languages
console.log(getMonthName(1, 'dari'));    // حمل
console.log(getMonthName(1, 'pashto'));  // وری
console.log(getMonthName(1, 'english')); // Hamal

// Format dates as readable strings
const formatted = formatDateString(
  { year: 1403, month: 1, day: 1 },
  'english'
);
console.log(formatted); // "Wednesday, 1 Hamal 1403"
```

## API Reference

### Flexible Conversion API

#### `convert(input: DateInput, options?: FormatOptions): string`

The main conversion function with flexible input and output formats.

**Input formats accepted:**
- JavaScript `Date` object
- ISO date string: `'2024-03-20'` or `'2024/03/20'`
- Persian numeral string: `'۲۰۲۴-۰۳-۲۰'`
- Date object: `{ year: 2024, month: 3, day: 20 }`
- Various formats: `'20-03-2024'`, `'20240320'`, etc.

**Format Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `format` | `string` | `'YYYY-MM-DD'` | Format template (see tokens below) |
| `numerals` | `'arabic' \| 'persian'` | `'arabic'` | Numeral system (0-9 or ۰-۹) |
| `language` | `'dari' \| 'pashto' \| 'english'` | `'dari'` | Language for month names |
| `separator` | `string` | `'-'` | Separator between date parts |

**Format Tokens:**
- `YYYY` - 4-digit year (e.g., 1403)
- `YY` - 2-digit year (e.g., 03)
- `MM` - 2-digit month (e.g., 01)
- `M` - Month without leading zero (e.g., 1)
- `MMM` - Month name (e.g., حمل, وری, Hamal)
- `DD` - 2-digit day (e.g., 01)
- `D` - Day without leading zero (e.g., 1)

**Examples:**

```typescript
// Standard format
convert('2024-03-20')
// "1403-01-01"

// Persian numerals
convert('2024-03-20', { numerals: 'persian' })
// "۱۴۰۳-۰۱-۰۱"

// Month name in Dari
convert('2024-03-20', { format: 'DD-MMM-YYYY', language: 'dari' })
// "01-حمل-1403"

// Persian numerals with Dari month name
convert('2024-03-20', {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'dari'
})
// "۰۱-حمل-۱۴۰۳"

// Persian numerals with Pashto month name
convert('2024-03-20', {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'pashto'
})
// "۰۱-وری-۱۴۰۳"

// Compact format
convert('2024-03-20', { format: 'D/M/YYYY' })
// "1/1/1403"

// Long format
convert('2024-03-20', { format: 'D MMM YYYY', language: 'dari' })
// "1 حمل 1403"

// Input with Persian numerals
convert('۲۰۲۴-۰۳-۲۰', { format: 'DD-MMM-YYYY', language: 'pashto' })
// "01-وری-1403"
```

#### `convert(input: DateInput, null): ShamsiDate`

Get the raw Shamsi date object without formatting.

```typescript
convert('2024-03-20', null)
// { year: 1403, month: 1, day: 1 }
```

#### `toShamsi(input: DateInput): ShamsiDate`

Convert any date input to a Shamsi date object.

```typescript
toShamsi('2024-03-20')
// { year: 1403, month: 1, day: 1 }

toShamsi(new Date(2024, 2, 20))
// { year: 1403, month: 1, day: 1 }

toShamsi({ year: 2024, month: 3, day: 20 })
// { year: 1403, month: 1, day: 1 }
```

#### `convertBatch(inputs: DateInput[], options?: FormatOptions): string[]`

Convert multiple dates at once.

```typescript
convertBatch([
  '2024-03-20',
  '2024-06-15',
  new Date(2024, 11, 31)
], {
  format: 'DD-MMM-YYYY',
  language: 'dari'
})
// ["01-حمل-1403", "26-جوزا-1403", "11-جدی-1403"]
```

#### `formatPresets`

Pre-configured format functions for common use cases:

```typescript
import { formatPresets } from 'afghan-calendar';

const date = { year: 1403, month: 1, day: 1 };

// Standard: 1403-01-01
formatPresets.standard(date)

// Month name with Arabic numerals: 01-حمل-1403
formatPresets.monthNameArabic(date, 'dari')

// Persian numerals: ۱۴۰۳-۰۱-۰۱
formatPresets.persian(date)

// Month name with Persian numerals: ۰۱-حمل-۱۴۰۳
formatPresets.monthNamePersian(date, 'dari')

// Compact: 1/1/1403
formatPresets.compact(date)

// Long format: 1 حمل 1403
formatPresets.long(date, 'dari')
```

#### Numeral Conversion Utilities

```typescript
import { toPersianNumerals, toArabicNumerals } from 'afghan-calendar';

// Convert to Persian numerals
toPersianNumerals('1403-01-01')
// "۱۴۰۳-۰۱-۰۱"

// Convert to Arabic numerals
toArabicNumerals('۱۴۰۳-۰۱-۰۱')
// "1403-01-01"
```

---

### Classic Date Conversion API

#### `shamsiToGregorian(shamsi: ShamsiDate): GregorianDate`

Convert a Shamsi date to Gregorian.

```typescript
const gregorian = shamsiToGregorian({ year: 1403, month: 6, day: 15 });
// { year: 2024, month: 9, day: 5 }
```

#### `gregorianToShamsi(gregorian: GregorianDate): ShamsiDate`

Convert a Gregorian date to Shamsi.

```typescript
const shamsi = gregorianToShamsi({ year: 2024, month: 9, day: 5 });
// { year: 1403, month: 6, day: 15 }
```

#### `getToday(): { shamsi: ShamsiDate; gregorian: GregorianDate }`

Get today's date in both calendars.

```typescript
const today = getToday();
```

#### `isLeapYear(year: number, calendar?: 'shamsi' | 'gregorian'): boolean`

Check if a year is a leap year.

```typescript
isLeapYear(1403, 'shamsi');    // true
isLeapYear(2024, 'gregorian'); // true
```

### Month and Day Names

#### `getMonthName(month: number, language?: Language): string`

Get the name of a month (1-12) in the specified language.

```typescript
getMonthName(1, 'dari');    // حمل
getMonthName(1, 'pashto');  // وری
getMonthName(1, 'english'); // Hamal
getMonthName(1);            // Hamal (defaults to English)
```

#### `getAllMonthNames(language?: Language): string[]`

Get all 12 month names.

```typescript
const monthNames = getAllMonthNames('dari');
// ['حمل', 'ثور', 'جوزا', ...]
```

#### `getDayName(dayOfWeek: number, language?: Language): string`

Get the name of a day of the week (0=Saturday, 6=Friday).

```typescript
getDayName(0, 'english'); // Saturday
getDayName(6, 'dari');    // جمعه (Friday)
```

#### `getAllDayNames(language?: Language): string[]`

Get all 7 day names starting from Saturday.

```typescript
const dayNames = getAllDayNames('english');
// ['Saturday', 'Sunday', 'Monday', ...]
```

### Formatting

#### `formatShamsiDate(shamsi: ShamsiDate): FormattedDate`

Get a fully formatted date object with localized month and day names.

```typescript
const formatted = formatShamsiDate({ year: 1403, month: 1, day: 1 });
// {
//   year: 1403,
//   month: 1,
//   day: 1,
//   monthName: { dari: 'حمل', pashto: 'وری', english: 'Hamal' },
//   dayOfWeek: 3,
//   dayName: { dari: 'چهارشنبه', pashto: 'څلورشنبه', english: 'Wednesday' }
// }
```

#### `formatDateString(shamsi: ShamsiDate, language?: Language): string`

Format a date as a readable string.

```typescript
formatDateString({ year: 1403, month: 1, day: 1 }, 'english');
// "Wednesday, 1 Hamal 1403"

formatDateString({ year: 1403, month: 1, day: 1 }, 'dari');
// "چهارشنبه, 1 حمل 1403"
```

#### `formatCompact(shamsi: ShamsiDate): string`

Format a date in compact notation (YYYY-MM-DD).

```typescript
formatCompact({ year: 1403, month: 1, day: 1 }); // "1403-01-01"
```

#### `parseCompact(dateString: string): ShamsiDate`

Parse a compact date string.

```typescript
parseCompact('1403-01-01'); // { year: 1403, month: 1, day: 1 }
```

### Utilities

#### `getDayOfWeek(shamsi: ShamsiDate): number`

Get the day of the week for a Shamsi date (0=Saturday, 6=Friday).

```typescript
const dayOfWeek = getDayOfWeek({ year: 1403, month: 1, day: 1 });
// 3 (Wednesday)
```

#### `getMonthNumber(monthName: string): number`

Get the month number from a month name (works with any language).

```typescript
getMonthNumber('Hamal');  // 1
getMonthNumber('حمل');    // 1
getMonthNumber('وری');    // 1
```

## TypeScript Support

This library is written in TypeScript and includes full type definitions.

```typescript
import type {
  ShamsiDate,
  GregorianDate,
  Language,
  FormattedDate
} from 'afghan-calendar';

const shamsi: ShamsiDate = { year: 1403, month: 1, day: 1 };
const language: Language = 'dari';
```

## Format Examples

Here are all the different ways you can format a date based on your requirements:

```typescript
import { convert } from 'afghan-calendar';

const gregorianDate = '2024-03-20'; // This converts to 1403-01-01 Shamsi

// ✅ Standard format with Arabic numerals
convert(gregorianDate)
// "1403-01-01"

// ✅ Month name with Arabic numerals (Dari)
convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  language: 'dari'
})
// "01-حمل-1403"

// ✅ Month name with Arabic numerals (Pashto)
convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  language: 'pashto'
})
// "01-وری-1403"

// ✅ Persian numerals only
convert(gregorianDate, {
  numerals: 'persian'
})
// "۱۴۰۳-۰۱-۰۱"

// ✅ Persian numerals with Dari month name
convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'dari'
})
// "۰۱-حمل-۱۴۰۳"

// ✅ Persian numerals with Pashto month name
convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'pashto'
})
// "۰۱-وری-۱۴۰۳"

// ✅ Different separators
convert(gregorianDate, { format: 'YYYY/MM/DD' })
// "1403/01/01"

convert(gregorianDate, { format: 'DD.MM.YYYY' })
// "01.01.1403"

// ✅ Without leading zeros
convert(gregorianDate, { format: 'D/M/YYYY' })
// "1/1/1403"

// ✅ Long format with month name
convert(gregorianDate, {
  format: 'D MMM YYYY',
  language: 'dari'
})
// "1 حمل 1403"

// ✅ Year-Month format
convert(gregorianDate, { format: 'YYYY-MM' })
// "1403-01"

// ✅ Month and day only
convert(gregorianDate, {
  format: 'DD MMM',
  language: 'dari'
})
// "01 حمل"

// ✅ Input can also have Persian numerals!
convert('۲۰۲۴-۰۳-۲۰', {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'dari'
})
// "۰۱-حمل-۱۴۰۳"
```

## Usage Examples

### React Component with Flexible Formatting

```typescript
import { convert } from 'afghan-calendar';
import { useState } from 'react';

function DateDisplay() {
  const today = new Date();
  const [format, setFormat] = useState<'arabic' | 'persian'>('arabic');
  const [language, setLanguage] = useState<'dari' | 'pashto' | 'english'>('dari');

  return (
    <div>
      <div>
        <label>
          Format:
          <select value={format} onChange={(e) => setFormat(e.target.value as any)}>
            <option value="arabic">Arabic Numerals</option>
            <option value="persian">Persian Numerals</option>
          </select>
        </label>

        <label>
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value as any)}>
            <option value="dari">Dari</option>
            <option value="pashto">Pashto</option>
            <option value="english">English</option>
          </select>
        </label>
      </div>

      <p>
        Today (Afghan Calendar): {convert(today, {
          format: 'DD-MMM-YYYY',
          numerals: format,
          language: language
        })}
      </p>

      <p>Today (Gregorian): {today.toLocaleDateString()}</p>
    </div>
  );
}
```

### Classic React Component

```typescript
import { getToday, formatDateString } from 'afghan-calendar';

function DateDisplay() {
  const { shamsi, gregorian } = getToday();

  return (
    <div>
      <p>Afghan: {formatDateString(shamsi, 'dari')}</p>
      <p>Gregorian: {new Date(gregorian.year, gregorian.month - 1, gregorian.day).toLocaleDateString()}</p>
    </div>
  );
}
```

### Date Picker Integration

```typescript
import { gregorianToShamsi, shamsiToGregorian } from 'afghan-calendar';

// Convert from a JavaScript Date object
function dateToShamsi(date: Date) {
  return gregorianToShamsi({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  });
}

// Convert to a JavaScript Date object
function shamsiToDate(shamsi: ShamsiDate): Date {
  const gregorian = shamsiToGregorian(shamsi);
  return new Date(gregorian.year, gregorian.month - 1, gregorian.day);
}
```

### Calendar Widget

```typescript
import {
  getAllMonthNames,
  getAllDayNames,
  formatShamsiDate
} from 'afghan-calendar';

// Generate a month view
function generateMonthCalendar(year: number, month: number, language: 'dari' | 'pashto' | 'english' = 'english') {
  const monthNames = getAllMonthNames(language);
  const dayNames = getAllDayNames(language);

  console.log(`${monthNames[month - 1]} ${year}`);
  console.log(dayNames.join(' '));

  // ... generate calendar grid
}
```

## Browser Support

This library works in all modern browsers and Node.js environments:

- ✅ Chrome / Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Node.js 14+
- ✅ React Native

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Built with ❤️ for Afghanistan and the Afghan diaspora worldwide.

## Related Projects

- [Afghan Calendar API](https://shamsi-calendar-api.com) - RESTful API for Afghan calendar with holidays

## Support

If you find this library helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📖 Improving documentation

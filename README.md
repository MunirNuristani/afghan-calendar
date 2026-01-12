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

✅ **Accurate conversions** between Afghan Shamsi and Gregorian calendars
✅ **Authentic Afghan month names** in Dari and Pashto
✅ **Zero dependencies** - lightweight and fast
✅ **TypeScript support** with full type definitions
✅ **Well-tested** with comprehensive test coverage
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

### Date Conversion

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

## Examples

### React Component

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

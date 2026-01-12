// Example usage of afghan-calendar library

const {
  shamsiToGregorian,
  gregorianToShamsi,
  getToday,
  getMonthName,
  getAllMonthNames,
  formatDateString,
  formatShamsiDate,
  isLeapYear
} = require('afghan-calendar');

console.log('=== Afghan Calendar Examples ===\n');

// Example 1: Convert Shamsi to Gregorian
console.log('1. Convert Shamsi to Gregorian (Nowruz 1403):');
const gregorian = shamsiToGregorian({ year: 1403, month: 1, day: 1 });
console.log(`   Shamsi: 1403-01-01`);
console.log(`   Gregorian: ${gregorian.year}-${gregorian.month}-${gregorian.day}\n`);

// Example 2: Convert Gregorian to Shamsi
console.log('2. Convert Gregorian to Shamsi:');
const shamsi = gregorianToShamsi({ year: 2024, month: 3, day: 20 });
console.log(`   Gregorian: 2024-03-20`);
console.log(`   Shamsi: ${shamsi.year}-${shamsi.month}-${shamsi.day}\n`);

// Example 3: Get today's date
console.log('3. Today\'s date:');
const today = getToday();
console.log(`   Shamsi: ${today.shamsi.year}-${today.shamsi.month}-${today.shamsi.day}`);
console.log(`   Gregorian: ${today.gregorian.year}-${today.gregorian.month}-${today.gregorian.day}\n`);

// Example 4: Month names in different languages
console.log('4. First month (Hamal) in different languages:');
console.log(`   Dari: ${getMonthName(1, 'dari')}`);
console.log(`   Pashto: ${getMonthName(1, 'pashto')}`);
console.log(`   English: ${getMonthName(1, 'english')}\n`);

// Example 5: All month names in Dari
console.log('5. All months in Dari:');
const dariMonths = getAllMonthNames('dari');
dariMonths.forEach((month, index) => {
  console.log(`   ${index + 1}. ${month}`);
});
console.log();

// Example 6: Format dates
console.log('6. Formatted date strings:');
const date = { year: 1403, month: 1, day: 1 };
console.log(`   English: ${formatDateString(date, 'english')}`);
console.log(`   Dari: ${formatDateString(date, 'dari')}`);
console.log(`   Pashto: ${formatDateString(date, 'pashto')}\n`);

// Example 7: Full date formatting
console.log('7. Full date information:');
const formatted = formatShamsiDate(date);
console.log(`   Year: ${formatted.year}`);
console.log(`   Month: ${formatted.month} (${formatted.monthName.english})`);
console.log(`   Day: ${formatted.day}`);
console.log(`   Day of week: ${formatted.dayName.english}\n`);

// Example 8: Leap years
console.log('8. Leap year check:');
console.log(`   Is 1403 a Shamsi leap year? ${isLeapYear(1403, 'shamsi')}`);
console.log(`   Is 2024 a Gregorian leap year? ${isLeapYear(2024, 'gregorian')}`);

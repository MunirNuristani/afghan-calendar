const {
  convert,
  toShamsi,
  convertBatch,
  formatPresets,
  toPersianNumerals,
  toArabicNumerals
} = require('../dist/index.js');

console.log('=== Afghan Calendar - Flexible Formatting Examples ===\n');

const gregorianDate = '2024-03-20'; // This is 1403-01-01 in Shamsi

// ============================================================
// EXAMPLE 1: Different input formats
// ============================================================
console.log('1️⃣  FLEXIBLE INPUT FORMATS\n');

console.log('From ISO string:', convert('2024-03-20'));
console.log('From Date object:', convert(new Date(2024, 2, 20)));
console.log('From date object:', convert({ year: 2024, month: 3, day: 20 }));
console.log('From Persian numerals:', convert('۲۰۲۴-۰۳-۲۰'));
console.log('');

// ============================================================
// EXAMPLE 2: Arabic numerals with different formats
// ============================================================
console.log('2️⃣  ARABIC NUMERALS (0-9)\n');

console.log('Standard format:', convert(gregorianDate));
console.log('With slashes:', convert(gregorianDate, { format: 'YYYY/MM/DD' }));
console.log('Without zeros:', convert(gregorianDate, { format: 'D/M/YYYY' }));
console.log('Day first:', convert(gregorianDate, { format: 'DD-MM-YYYY' }));
console.log('');

// ============================================================
// EXAMPLE 3: Month names with Arabic numerals
// ============================================================
console.log('3️⃣  MONTH NAMES WITH ARABIC NUMERALS\n');

console.log('Dari month:', convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  language: 'dari'
}));

console.log('Pashto month:', convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  language: 'pashto'
}));

console.log('English month:', convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  language: 'english'
}));

console.log('Long format (Dari):', convert(gregorianDate, {
  format: 'D MMM YYYY',
  language: 'dari'
}));
console.log('');

// ============================================================
// EXAMPLE 4: Persian numerals (۰-۹)
// ============================================================
console.log('4️⃣  PERSIAN NUMERALS (۰-۹)\n');

console.log('Standard format:', convert(gregorianDate, {
  numerals: 'persian'
}));

console.log('With slashes:', convert(gregorianDate, {
  format: 'YYYY/MM/DD',
  numerals: 'persian'
}));

console.log('Without zeros:', convert(gregorianDate, {
  format: 'D/M/YYYY',
  numerals: 'persian'
}));
console.log('');

// ============================================================
// EXAMPLE 5: Persian numerals with month names
// ============================================================
console.log('5️⃣  PERSIAN NUMERALS WITH MONTH NAMES\n');

console.log('Dari:', convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'dari'
}));

console.log('Pashto:', convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'pashto'
}));

console.log('English:', convert(gregorianDate, {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'english'
}));

console.log('Long format:', convert(gregorianDate, {
  format: 'D MMM YYYY',
  numerals: 'persian',
  language: 'dari'
}));
console.log('');

// ============================================================
// EXAMPLE 6: Using format presets
// ============================================================
console.log('6️⃣  FORMAT PRESETS\n');

const shamsiDate = { year: 1403, month: 1, day: 1 };

console.log('Standard:', formatPresets.standard(shamsiDate));
console.log('Month name (Arabic):', formatPresets.monthNameArabic(shamsiDate, 'dari'));
console.log('Persian numerals:', formatPresets.persian(shamsiDate));
console.log('Month name (Persian):', formatPresets.monthNamePersian(shamsiDate, 'dari'));
console.log('Compact:', formatPresets.compact(shamsiDate));
console.log('Long:', formatPresets.long(shamsiDate, 'dari'));
console.log('');

// ============================================================
// EXAMPLE 7: Getting raw Shamsi date object
// ============================================================
console.log('7️⃣  RAW DATE OBJECTS\n');

console.log('Using convert():', convert(gregorianDate, null));
console.log('Using toShamsi():', toShamsi(gregorianDate));
console.log('');

// ============================================================
// EXAMPLE 8: Batch conversion
// ============================================================
console.log('8️⃣  BATCH CONVERSION\n');

const dates = ['2024-03-20', '2024-06-15', '2024-12-31'];

console.log('Original dates:', dates);
console.log('Converted (standard):', convertBatch(dates));
console.log('Converted (Persian with month):', convertBatch(dates, {
  format: 'DD-MMM-YYYY',
  numerals: 'persian',
  language: 'dari'
}));
console.log('');

// ============================================================
// EXAMPLE 9: Numeral conversion utilities
// ============================================================
console.log('9️⃣  NUMERAL CONVERSION UTILITIES\n');

console.log('To Persian:', toPersianNumerals('1403-01-01'));
console.log('To Arabic:', toArabicNumerals('۱۴۰۳-۰۱-۰۱'));
console.log('Mixed content:', toPersianNumerals('Year 1403, Month 1, Day 1'));
console.log('');

// ============================================================
// EXAMPLE 10: Real-world use cases
// ============================================================
console.log('🔟 REAL-WORLD USE CASES\n');

// Display on a website
console.log('Website display (Dari):');
console.log('  ', convert(new Date(), {
  format: 'DD MMM YYYY',
  language: 'dari'
}));

// Form input with Persian numerals
console.log('\nForm input (Persian):');
console.log('  ', convert(new Date(), {
  format: 'YYYY/MM/DD',
  numerals: 'persian'
}));

// API response
console.log('\nAPI response (ISO-like):');
console.log('  ', convert(new Date(), {
  format: 'YYYY-MM-DD'
}));

// Mobile app notification (Pashto)
console.log('\nNotification (Pashto):');
console.log('  ', convert(new Date(), {
  format: 'D MMM',
  language: 'pashto'
}));

console.log('\n✅ All examples completed!');

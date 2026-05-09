<div align="center">

# 🎊 Chinese Holidays

**A lightweight library to determine Chinese public holidays and workdays**

[![npm version](https://img.shields.io/npm/v/@kang8/chinese-holidays.svg)](https://www.npmjs.com/package/@kang8/chinese-holidays)
[![npm downloads](https://img.shields.io/npm/dm/@kang8/chinese-holidays.svg)](https://www.npmjs.com/package/@kang8/chinese-holidays)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[English](#) | [中文](README-cn.md)

</div>

---

## ✨ Features

- 🎯 **Accurate** - Based on official Chinese government holiday announcements
- 🚀 **Lightweight** - Zero dependencies, minimal footprint
- 📅 **Up-to-date** - Regularly updated with latest holiday data
- 💪 **TypeScript** - Full TypeScript support with type definitions
- 🔄 **Comprehensive** - Handles both holidays and workdays (including adjusted workdays)

## 📦 Installation

```sh
pnpm install @kang8/chinese-holidays
```

Or using npm:

```sh
npm install @kang8/chinese-holidays
```

Or using yarn:

```sh
yarn add @kang8/chinese-holidays
```

## 🚀 Quick Start

```js
import { holiday } from '@kang8/chinese-holidays'

const nationalDay = new Date('2022-10-01')

// Check if it's a holiday
holiday.isHoliday(nationalDay) // true

// Check if it's a workday
holiday.isWorkday(nationalDay) // false

// Get the holiday name
holiday.publicHolidayName(nationalDay) // '国庆节'
```

## 📖 API Reference

Dates are evaluated as China Standard Time (UTC+08:00) calendar dates, so
`new Date('YYYY-MM-DD')` behaves consistently across runtime time zones.

### `isHoliday(date: Date): boolean`

Check if the given date is a holiday (including weekends and public holidays).

```js
holiday.isHoliday(new Date('2022-10-01')) // true - National Day
holiday.isHoliday(new Date('2022-10-08')) // false - Adjusted workday (Saturday)
```

### `isWorkday(date: Date): boolean`

Check if the given date is a workday.

```js
holiday.isWorkday(new Date('2022-10-07')) // false - National Day holiday period
holiday.isWorkday(new Date('2022-10-11')) // true - Regular workday
```

### `isPublicHoliday(date: Date): boolean`

Check if the given date is an official public holiday (excluding regular weekends).

```js
holiday.isPublicHoliday(new Date('2022-10-01')) // true - National Day
holiday.isPublicHoliday(new Date('2022-10-08')) // false - Adjusted workday
```

### `isPublicWorkday(date: Date): boolean`

Check if the given date is an adjusted workday (working on weekend due to holiday scheduling).

```js
// October 8, 2022 (Saturday) was a working day to compensate for National Day holiday
holiday.isPublicWorkday(new Date('2022-10-08')) // true
```

### `publicHolidayName(date: Date): string | null`

Get the name of the public holiday. Returns `null` if the date is not a public holiday.

```js
holiday.publicHolidayName(new Date('2022-10-01')) // '国庆节'
holiday.publicHolidayName(new Date('2022-09-30')) // null
```

## 📅 Data Source

Holiday data is sourced from [NateScarlet/holiday-cn](https://github.com/NateScarlet/holiday-cn), which aggregates official announcements from the State Council of China. The data is regularly updated to reflect the latest official holiday schedules.

## 🛠️ Development

This project uses pnpm as the package manager.

```sh
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -am 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [chinese-workday](https://github.com/yize/chinese-workday) - Another Chinese workday library
- [chinese-holidays-node](https://github.com/bastengao/chinese-holidays-node) - Node.js Chinese holidays library
- [chinese-holidays](https://github.com/MrSeaWave/chinese-holidays) - Alternative Chinese holidays implementation

---

<div align="center">
Made with ❤️ by <a href="https://github.com/kang8">kang8</a>
</div>

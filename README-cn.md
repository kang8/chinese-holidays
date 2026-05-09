<div align="center">

# 🎊 Chinese Holidays

**一个轻量级的中国法定节假日和工作日判断库**

[![npm version](https://img.shields.io/npm/v/@kang8/chinese-holidays.svg)](https://www.npmjs.com/package/@kang8/chinese-holidays)
[![npm downloads](https://img.shields.io/npm/dm/@kang8/chinese-holidays.svg)](https://www.npmjs.com/package/@kang8/chinese-holidays)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[English](README.md) | [中文](#)

</div>

---

## ✨ 特性

- 🎯 **准确可靠** - 基于中国国务院官方节假日公告
- 🚀 **轻量零依赖** - 无外部依赖，体积小巧
- 📅 **及时更新** - 定期更新最新节假日数据
- 💪 **TypeScript 支持** - 完整的 TypeScript 类型定义
- 🔄 **功能完善** - 支持节假日和工作日判断（包括调休工作日）

## 📦 安装

```sh
pnpm install @kang8/chinese-holidays
```

或使用 npm：

```sh
npm install @kang8/chinese-holidays
```

或使用 yarn：

```sh
yarn add @kang8/chinese-holidays
```

## 🚀 快速开始

```js
import { holiday } from '@kang8/chinese-holidays'

const nationalDay = new Date('2022-10-01')

// 检查是否为假期
holiday.isHoliday(nationalDay) // true

// 检查是否为工作日
holiday.isWorkday(nationalDay) // false

// 获取节假日名称
holiday.publicHolidayName(nationalDay) // '国庆节'
```

## 📖 API 文档

日期会按中国标准时间（UTC+08:00）的日历日判断，因此 `new Date('YYYY-MM-DD')` 在不同运行时区下会得到一致结果。

### `isHoliday(date: Date): boolean`

判断给定日期是否为假期（包括周末和法定节假日）。

```js
holiday.isHoliday(new Date('2022-10-01')) // true - 国庆节
holiday.isHoliday(new Date('2022-10-08')) // false - 调休工作日（周六）
```

### `isWorkday(date: Date): boolean`

判断给定日期是否为工作日。

```js
holiday.isWorkday(new Date('2022-10-08')) // true - 调休工作日
holiday.isWorkday(new Date('2022-10-11')) // true - 正常工作日
```

### `isPublicHoliday(date: Date): boolean`

判断给定日期是否为法定节假日（不包括普通周末）。

```js
holiday.isPublicHoliday(new Date('2022-10-01')) // true - 国庆节
holiday.isPublicHoliday(new Date('2022-10-08')) // false - 调休工作日
```

### `isPublicWorkday(date: Date): boolean`

判断给定日期是否为调休工作日（因节假日调整而需要上班的周末）。

```js
// 2022年10月8日（周六）因国庆假期调休需上班
holiday.isPublicWorkday(new Date('2022-10-08')) // true
```

### `publicHolidayName(date: Date): string | null`

获取法定节假日的名称。如果不是法定节假日则返回 `null`。

```js
holiday.publicHolidayName(new Date('2022-10-01')) // '国庆节'
holiday.publicHolidayName(new Date('2022-09-30')) // null
```

## 📅 数据来源

节假日数据来源于 [NateScarlet/holiday-cn](https://github.com/NateScarlet/holiday-cn)，该项目汇总了中国国务院发布的官方节假日公告。数据会定期更新以反映最新的官方节假日安排。

## 🛠️ 开发

本项目使用 pnpm 作为包管理器。

```sh
# 安装依赖
pnpm install

# 构建项目
pnpm build

# 运行测试
pnpm test
```

## 🤝 贡献

欢迎贡献代码！请随时提交 Pull Request。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的修改 (`git commit -am '添加某个很棒的特性'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关项目

- [chinese-workday](https://github.com/yize/chinese-workday) - 另一个中国工作日库
- [chinese-holidays-node](https://github.com/bastengao/chinese-holidays-node) - Node.js 中国节假日库
- [chinese-holidays](https://github.com/MrSeaWave/chinese-holidays) - 另一个中国节假日实现

---

<div align="center">
Made with ❤️ by <a href="https://github.com/kang8">kang8</a>
</div>

# Chinese Holidays
> 判断日期是否为中国法定节假日

[English](README.md) | 中文


## 安装

```sh
npm install @kang8/chinese-holidays
```

## 如何使用

```js
import { holiday } from '@kang8/chinese-holidays'

const national_day = new Date('2022-10-01')

holiday.isHoliday(national_day) // true
holiday.isWorkday(national_day) // false
holiday.isPublicHoliday(national_day) // true
holiday.isPublicWorkday(national_day) // false
holiday.publicHolidayName(national_day) // 国庆节
holiday.publicHolidayName(new Date('2022-09-30')) // null
```

## 开发设置

```sh
npm install
npm run build
npm test
```

## 贡献

1. Fork 仓库 (<https://github.com/kang8/chinese-holidays>)
2. 创建分支 (`git checkout -b new_feature`)
3. 提交你的修改 (`git commit -am 'New feature'`)
4. 推送你的分支 (`git push origin new_feature`)
5. 发送 Pull Request

## 许可证

根据 MIT 许可证分发。更多信息请参见 [LICENSE](LICENSE)。

## 其他类似项目

* https://github.com/yize/chinese-workday
* https://github.com/bastengao/chinese-holidays-node
* https://github.com/MrSeaWave/chinese-holidays

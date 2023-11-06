# Chinese Holidays
> determine whether the date is a public holiday in China.

English | [中文](README-cn.md)


## Installation

```sh
npm install @kang8/chinese-holidays
```

## Usage example

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

## Development setup


```sh
npm install
npm run build
npm test
```

## Contributing

1. Fork it (<https://github.com/kang8/chinese-holidays>)
2. Create your feature branch (`git checkout -b new_feature`)
3. Commit your changes (`git commit -am 'New feature'`)
4. Push to the branch (`git push origin new_feature`)
5. Create a new Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Related Projects

* https://github.com/yize/chinese-workday
* https://github.com/bastengao/chinese-holidays-node
* https://github.com/MrSeaWave/chinese-holidays

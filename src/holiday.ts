import fs from 'fs'
import path from 'path'

const data_path: string = path.join(__dirname, '../data')

type HolidayCnJsonSchema = {
  year: number
  days: Array<HolidayJson>
}

type HolidayJson = {
  name: string
  date: string
  isOffDay: boolean
}

type HolidayDate = {
  date: Map<string, HolidayDateInfo>
}

type HolidayDateInfo = {
  name: string
  type: string
}

export class Holiday {
  data: Map<number, HolidayDate>

  constructor() {
    this.data = new Map()
    this.setup()
  }

  setup() {
    const data_files: Array<string> = fs.readdirSync(data_path)

    data_files.forEach((file_name: string) => {
      const json_data_regex = new RegExp('20[012]\\d.json', 'gm')

      if (!json_data_regex.test(file_name)) {
        return
      }

      const year: string = file_name.slice(0, 4)
      const file_buffer: Buffer = fs.readFileSync(path.join(__dirname, `../data/${file_name}`))

      this.parseYearJson(JSON.parse(file_buffer.toString()))
    })
  }

  parseYearJson(holiday_cn_json_schema: HolidayCnJsonSchema) {
    const year: number = holiday_cn_json_schema.year

    this.data[year] = new Map()

    holiday_cn_json_schema.days.forEach((holiday_json: HolidayJson) => {
      this.data[year][holiday_json.date] = {
        name: holiday_json.name,
        type: holiday_json.isOffDay ? 'publicHoliday' : 'publicWorkday',
      }
    })
  }

  formatDate(date: Date): string {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    )
  }

  // https://en.wikipedia.org/wiki/Public_holiday
  isPublicHoliday(date: Date): boolean {
    const format_date = this.formatDate(date)

    return this.data[date.getFullYear()][format_date]?.type === 'publicHoliday'
  }

  isPublicWorkday(date: Date): boolean {
    const format_date = this.formatDate(date)

    return this.data[date.getFullYear()][format_date]?.type === 'publicWorkday'
  }

  isHoliday(date: Date): boolean {
    return !this.isPublicWorkday(date) && (this.isPublicHoliday(date) || date.getDay() === 0 || date.getDay() === 6)
  }

  isWorkday(date: Date): boolean {
    return !this.isHoliday(date)
  }
}

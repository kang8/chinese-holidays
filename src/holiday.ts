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
  private readonly data: Map<number, HolidayDate>

  constructor() {
    this.data = new Map()
    this.setup()
  }

  private setup() {
    const data_files: Array<string> = fs.readdirSync(data_path)

    data_files.forEach((file_name: string) => {
      const json_data_regex = new RegExp('20\\d{2}\\.json$', 'gm')

      if (!json_data_regex.test(file_name)) {
        return
      }

      const file_buffer: Buffer = fs.readFileSync(path.join(__dirname, `../data/${file_name}`))

      this.parseYearJson(JSON.parse(file_buffer.toString()))
    })
  }

  private parseYearJson(holiday_cn_json_schema: HolidayCnJsonSchema) {
    holiday_cn_json_schema.days.forEach((holiday_json: HolidayJson) => {
      const year = new Date(holiday_json.date).getFullYear()

      if (!this.data.has(year)) {
        this.data.set(year, { date: new Map() })
      }

      this.data.get(year)!.date.set(holiday_json.date, {
        name: holiday_json.name,
        type: holiday_json.isOffDay ? 'publicHoliday' : 'publicWorkday',
      })
    })
  }

  /**
   * Formats a Date object to 'YYYY-MM-DD' string format
   *
   * @param date - The date object to format
   * @returns The formatted date string in 'YYYY-MM-DD' format
   * @example
   * ```ts
   * formatDate(new Date('2024-01-05')) // '2024-01-05'
   * formatDate(new Date('2024-12-31')) // '2024-12-31'
   * ```
   */
  private formatDate(date: Date): string {
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
    const yearData = this.data.get(date.getFullYear())

    return yearData?.date.get(format_date)?.type === 'publicHoliday'
  }

  isPublicWorkday(date: Date): boolean {
    const format_date = this.formatDate(date)
    const yearData = this.data.get(date.getFullYear())

    return yearData?.date.get(format_date)?.type === 'publicWorkday'
  }

  isHoliday(date: Date): boolean {
    return (
      !this.isPublicWorkday(date) &&
      (this.isPublicHoliday(date) || date.getDay() === 0 || date.getDay() === 6)
    )
  }

  isWorkday(date: Date): boolean {
    return !this.isHoliday(date)
  }

  publicHolidayName(date: Date): string | null {
    if (!this.isPublicHoliday(date)) {
      return null
    }

    const format_date = this.formatDate(date)
    const yearData = this.data.get(date.getFullYear())

    return yearData?.date.get(format_date)?.name ?? null
  }
}

import fs from 'fs'
import path from 'path'

const data_path: string = path.join(__dirname, '../data')

type HolidayJson = {
  name: string
  range: Array<string>
  type: string
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

    data_files.forEach((file: string) => {
      const year: string = file.slice(0, 4)
      const file_buffer: Buffer = fs.readFileSync(path.join(__dirname, `../data/${file}`))

      this.parseYearJson(year, JSON.parse(file_buffer.toString()))
    })
  }

  parseYearJson(year: string, year_json: Array<HolidayJson>) {
    this.data[parseInt(year)] = new Map()

    year_json.forEach((holiday_json: HolidayJson) => {
      holiday_json.range.forEach((date: string) => {
        this.data[year][date] = {
          name: holiday_json.name,
          type: holiday_json.type,
        }
      })
    })
  }

  formatDate(date: Date): string {
    return (
      date.getFullYear() +
      '-' +
      date.getMonth().toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    )
  }

  isPublicHoliday(date: Date): boolean {
    const format_date = this.formatDate(date)

    return this.data[date.getFullYear()][format_date]?.type === 'holiday'
  }

  isPublicWorkday(date: Date): boolean {
    const format_date = this.formatDate(date)

    return this.data[date.getFullYear()][format_date]?.type === 'workday'
  }

  isHoliday(date: Date): boolean {
    return this.isPublicHoliday(date) || date.getDay() === 0 || date.getDate() === 6
  }

  isWorkday(date: Date): boolean {
    return !this.isHoliday(date)
  }
}

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
}

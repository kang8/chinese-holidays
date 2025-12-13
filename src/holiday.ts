import { HOLIDAY_NAMES, HOLIDAY_DATA, CompactDay } from './holiday-data'

type HolidayDate = {
  date: Map<string, HolidayDateInfo>
}

type DayType = 'publicHoliday' | 'publicWorkday'

type HolidayDateInfo = {
  name: string
  type: DayType
}

export class Holiday {
  private readonly data: Map<number, HolidayDate>

  constructor() {
    this.data = new Map()
    this.setup()
  }

  private setup() {
    for (const [year, days] of Object.entries(HOLIDAY_DATA)) {
      const yearNum = parseInt(year)

      for (const [nameIndex, monthDay, isOffDay] of days as CompactDay[]) {
        if (!this.data.has(yearNum)) {
          this.data.set(yearNum, { date: new Map() })
        }

        // Rebuild date string
        const month = Math.floor(monthDay / 100)
        const day = monthDay % 100
        const dateStr = `${yearNum}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

        this.data.get(yearNum)!.date.set(dateStr, {
          name: HOLIDAY_NAMES[nameIndex],
          type: isOffDay === 1 ? 'publicHoliday' : 'publicWorkday',
        })
      }
    }
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

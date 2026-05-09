import { HOLIDAY_NAMES, HOLIDAY_DATA, CompactDay } from './holiday-data'

export type DateInput = Date | string

type DayType = 'publicHoliday' | 'publicWorkday'

type HolidayDateInfo = {
  name: string
  type: DayType
}

type ChinaDateParts = {
  year: number
  month: number
  day: number
  dayOfWeek: number
}

const CHINA_TIME_OFFSET_MS = 8 * 60 * 60 * 1000

export class Holiday {
  private readonly lookup = new Map<number, HolidayDateInfo>()

  constructor() {
    for (const [year, days] of Object.entries(HOLIDAY_DATA)) {
      const yearNum = Number(year)
      for (const [nameIndex, monthDay, isOffDay] of days as CompactDay[]) {
        this.lookup.set(yearNum * 10000 + monthDay, {
          name: HOLIDAY_NAMES[nameIndex],
          type: isOffDay === 1 ? 'publicHoliday' : 'publicWorkday',
        })
      }
    }
  }

  /**
   * Returns true when `input` is a Chinese statutory public holiday
   * (e.g. National Day, Spring Festival).
   *
   * @example
   * holiday.isPublicHoliday('2025-10-01') // true
   * holiday.isPublicHoliday(new Date(2025, 9, 1)) // true
   */
  isPublicHoliday(input: DateInput): boolean {
    return this.getInfo(this.toParts(input))?.type === 'publicHoliday'
  }

  /**
   * Returns true when `input` is an adjusted working day — a weekend day
   * officially designated as a workday to compensate for an extended break.
   *
   * @example
   * holiday.isPublicWorkday('2025-01-26') // true (Sunday made workday for Spring Festival)
   */
  isPublicWorkday(input: DateInput): boolean {
    return this.getInfo(this.toParts(input))?.type === 'publicWorkday'
  }

  /**
   * Returns the Chinese name of the public holiday on `input`, or `null` if
   * `input` is not a public holiday (adjusted workdays return `null`).
   *
   * @example
   * holiday.publicHolidayName('2025-10-01') // '国庆节'
   * holiday.publicHolidayName('2025-01-26') // null
   */
  publicHolidayName(input: DateInput): string | null {
    const info = this.getInfo(this.toParts(input))
    return info?.type === 'publicHoliday' ? info.name : null
  }

  /**
   * Returns true when `input` is a non-working day: a public holiday, or a
   * weekend that has not been converted into an adjusted workday.
   *
   * @example
   * holiday.isHoliday('2025-10-01') // true (National Day)
   * holiday.isHoliday('2025-01-26') // false (Sunday but adjusted to workday)
   */
  isHoliday(input: DateInput): boolean {
    const parts = this.toParts(input)
    const info = this.getInfo(parts)

    return (
      info?.type !== 'publicWorkday' &&
      (info?.type === 'publicHoliday' || parts.dayOfWeek === 0 || parts.dayOfWeek === 6)
    )
  }

  /**
   * Returns true when `input` is a working day. Inverse of {@link isHoliday}.
   *
   * @example
   * holiday.isWorkday('2025-10-08') // true
   */
  isWorkday(input: DateInput): boolean {
    return !this.isHoliday(input)
  }

  /**
   * Normalizes `input` to a calendar date in China time (UTC+8).
   * - String inputs are parsed as `'YYYY-MM-DD'` calendar dates, free of any
   *   platform timezone effects.
   * - Date inputs are interpreted as moments in time and converted to the
   *   corresponding China date, so timezone-naive constructs like
   *   `new Date('2025-01-01')` (UTC midnight) resolve to Jan 1 in China.
   */
  private toParts(input: DateInput): ChinaDateParts {
    if (typeof input === 'string') {
      const [year, month, day] = input.slice(0, 10).split('-').map(Number)
      const dayOfWeek = new Date(Date.UTC(year, month - 1, day)).getUTCDay()
      return { year, month, day, dayOfWeek }
    }
    const chinaDate = new Date(input.getTime() + CHINA_TIME_OFFSET_MS)
    return {
      year: chinaDate.getUTCFullYear(),
      month: chinaDate.getUTCMonth() + 1,
      day: chinaDate.getUTCDate(),
      dayOfWeek: chinaDate.getUTCDay(),
    }
  }

  private getInfo(parts: ChinaDateParts): HolidayDateInfo | undefined {
    return this.lookup.get(parts.year * 10000 + parts.month * 100 + parts.day)
  }
}

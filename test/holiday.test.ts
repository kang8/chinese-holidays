import { describe, it, expect } from 'vitest'
import { holiday } from '../src'

describe('class', () => {
  it('2022-06-19 is not workday', () => {
    expect(holiday.isWorkday(new Date('2022-06-19'))).toBe(false)
  })

  it('2022-06-19 is holiday', () => {
    expect(holiday.isHoliday(new Date('2022-06-19'))).toBe(true)
    expect(holiday.isHoliday(new Date('2022-06-19'))).toBe(true)
  })

  it('2022-10-08 is not holiday', () => {
    expect(holiday.isHoliday(new Date('2022-10-08'))).toBe(false)
    expect(holiday.publicHolidayName(new Date('2022-10-08'))).toBe(null)
  })

  it('2022-06-19 is not public holiday', () => {
    expect(holiday.isPublicHoliday(new Date('2022-06-19'))).toBe(false)
  })

  it('2022-06-19 is not public workday', () => {
    expect(holiday.isPublicWorkday(new Date('2022-06-19'))).toBe(false)
  })

  it('2022-10-01 is public holiday', () => {
    expect(holiday.isPublicHoliday(new Date('2022-10-1'))).toBe(true)
    expect(holiday.publicHolidayName(new Date('2022-10-1'))).toBe('国庆节')
  })

  it('2023-10-01 is public holiday', () => {
    expect(holiday.isPublicHoliday(new Date('2023-10-1'))).toBe(true)
    expect(holiday.publicHolidayName(new Date('2023-10-1'))).toBe('中秋节、国庆节')
  })

  it('2022-12-31 is public holiday', () => {
    expect(holiday.isPublicHoliday(new Date('2022-12-31'))).toBe(true)
  })
})

describe('2025 holidays', () => {
  it('2025-01-01 is public holiday (New Year)', () => {
    expect(holiday.isPublicHoliday(new Date('2025-01-01'))).toBe(true)
    expect(holiday.publicHolidayName(new Date('2025-01-01'))).toBe('元旦')
    expect(holiday.isWorkday(new Date('2025-01-01'))).toBe(false)
  })

  it('2025-01-28 is public holiday (Spring Festival)', () => {
    expect(holiday.isPublicHoliday(new Date('2025-01-28'))).toBe(true)
    expect(holiday.publicHolidayName(new Date('2025-01-28'))).toBe('春节')
  })

  it('2025-01-26 is public workday (adjusted for Spring Festival)', () => {
    expect(holiday.isPublicWorkday(new Date('2025-01-26'))).toBe(true)
    expect(holiday.isHoliday(new Date('2025-01-26'))).toBe(false)
    expect(holiday.isWorkday(new Date('2025-01-26'))).toBe(true)
  })
})

describe('Different holiday types', () => {
  it('should distinguish between public holidays and adjusted workdays', () => {
    // 2022-10-01 is a public holiday (National Day)
    const nationalDay = new Date('2022-10-01')
    expect(holiday.isPublicHoliday(nationalDay)).toBe(true)
    expect(holiday.isPublicWorkday(nationalDay)).toBe(false)
    expect(holiday.isHoliday(nationalDay)).toBe(true)
    expect(holiday.isWorkday(nationalDay)).toBe(false)

    // 2022-10-08 is a Saturday but it's a workday (adjusted)
    const adjustedWorkday = new Date('2022-10-08')
    expect(holiday.isPublicWorkday(adjustedWorkday)).toBe(true)
    expect(holiday.isPublicHoliday(adjustedWorkday)).toBe(false)
    expect(holiday.isHoliday(adjustedWorkday)).toBe(false)
    expect(holiday.isWorkday(adjustedWorkday)).toBe(true)
  })

  it('should return null for non-public-holiday dates', () => {
    expect(holiday.publicHolidayName(new Date('2022-03-15'))).toBe(null)
    expect(holiday.publicHolidayName(new Date('2022-10-08'))).toBe(null)
  })
})

describe('China timezone date handling', () => {
  it('interprets date-only strings as China calendar dates in any runtime timezone', () => {
    const nationalDay = new Date('2022-10-01')

    expect(holiday.isPublicHoliday(nationalDay)).toBe(true)
    expect(holiday.publicHolidayName(nationalDay)).toBe('国庆节')
    expect(holiday.isHoliday(nationalDay)).toBe(true)
  })

  it('uses China calendar day for instants near UTC day boundaries', () => {
    const nationalDayStartInChina = new Date('2022-09-30T16:00:00.000Z')
    const adjustedWorkdayStartInChina = new Date('2022-10-07T16:00:00.000Z')

    expect(holiday.isPublicHoliday(nationalDayStartInChina)).toBe(true)
    expect(holiday.publicHolidayName(nationalDayStartInChina)).toBe('国庆节')
    expect(holiday.isPublicWorkday(adjustedWorkdayStartInChina)).toBe(true)
    expect(holiday.isHoliday(adjustedWorkdayStartInChina)).toBe(false)
  })
})

describe('README examples', () => {
  describe('Quick Start example', () => {
    it('should work with National Day 2022-10-01', () => {
      const nationalDay = new Date('2022-10-01')

      // Check if it's a holiday
      expect(holiday.isHoliday(nationalDay)).toBe(true)

      // Check if it's a workday
      expect(holiday.isWorkday(nationalDay)).toBe(false)

      // Get the holiday name
      expect(holiday.publicHolidayName(nationalDay)).toBe('国庆节')
    })
  })

  describe('isHoliday() examples', () => {
    it('2022-10-01 should be true (National Day)', () => {
      expect(holiday.isHoliday(new Date('2022-10-01'))).toBe(true)
    })

    it('2022-10-08 should be false (adjusted workday, not a regular weekend)', () => {
      // Note: 2022-10-08 is a Saturday but was an adjusted workday
      expect(holiday.isHoliday(new Date('2022-10-08'))).toBe(false)
    })
  })

  describe('isWorkday() examples', () => {
    it('2022-10-07 should be false (National Day holiday period)', () => {
      expect(holiday.isWorkday(new Date('2022-10-07'))).toBe(false)
    })

    it('2022-10-11 should be true (Regular workday)', () => {
      expect(holiday.isWorkday(new Date('2022-10-11'))).toBe(true)
    })
  })

  describe('isPublicHoliday() examples', () => {
    it('2022-10-01 should be true (National Day)', () => {
      expect(holiday.isPublicHoliday(new Date('2022-10-01'))).toBe(true)
    })

    it('2022-10-08 should be false (Regular weekend, adjusted to workday)', () => {
      expect(holiday.isPublicHoliday(new Date('2022-10-08'))).toBe(false)
    })
  })

  describe('isPublicWorkday() examples', () => {
    it('2022-10-08 should be true (Saturday adjusted to workday)', () => {
      // October 8, 2022 (Saturday) was a working day to compensate for National Day holiday
      expect(holiday.isPublicWorkday(new Date('2022-10-08'))).toBe(true)
    })
  })

  describe('publicHolidayName() examples', () => {
    it('2022-10-01 should return "国庆节"', () => {
      expect(holiday.publicHolidayName(new Date('2022-10-01'))).toBe('国庆节')
    })

    it('2022-09-30 should return null', () => {
      expect(holiday.publicHolidayName(new Date('2022-09-30'))).toBe(null)
    })
  })
})

describe('String input (YYYY-MM-DD)', () => {
  it('isPublicHoliday accepts string', () => {
    expect(holiday.isPublicHoliday('2025-01-01')).toBe(true)
    expect(holiday.isPublicHoliday('2025-01-15')).toBe(false)
  })

  it('isPublicWorkday accepts string', () => {
    expect(holiday.isPublicWorkday('2025-01-26')).toBe(true)
  })

  it('publicHolidayName accepts string', () => {
    expect(holiday.publicHolidayName('2022-10-01')).toBe('国庆节')
    expect(holiday.publicHolidayName('2025-01-26')).toBe(null)
  })

  it('isHoliday accepts string', () => {
    expect(holiday.isHoliday('2022-10-01')).toBe(true)
    expect(holiday.isHoliday('2022-10-08')).toBe(false)
    expect(holiday.isHoliday('2030-01-05')).toBe(true)
  })

  it('isWorkday accepts string', () => {
    expect(holiday.isWorkday('2022-10-08')).toBe(true)
    expect(holiday.isWorkday('2025-01-26')).toBe(true)
    expect(holiday.isWorkday('2030-01-04')).toBe(true)
  })

  it('tolerates ISO datetime suffixes', () => {
    expect(holiday.publicHolidayName('2022-10-01T00:00:00.000Z')).toBe('国庆节')
    expect(holiday.publicHolidayName('2022-10-01T12:34:56')).toBe('国庆节')
  })
})

describe('Out-of-data-range fallback', () => {
  it('treats unknown years as ordinary calendar (weekend = holiday)', () => {
    expect(holiday.isHoliday(new Date(2030, 0, 1))).toBe(false)
    expect(holiday.isHoliday(new Date(2030, 0, 4))).toBe(false)
    expect(holiday.isHoliday(new Date(2030, 0, 5))).toBe(true)
    expect(holiday.isHoliday(new Date(2030, 0, 6))).toBe(true)
  })

  it('returns null for publicHolidayName on unknown years', () => {
    expect(holiday.publicHolidayName(new Date(2030, 0, 1))).toBe(null)
    expect(holiday.publicHolidayName('2030-01-01')).toBe(null)
  })

  it('reports nothing as public holiday/workday outside data range', () => {
    expect(holiday.isPublicHoliday('2030-01-01')).toBe(false)
    expect(holiday.isPublicWorkday('2030-01-05')).toBe(false)
  })
})

describe('Year boundary', () => {
  it('2025-12-31 is a regular workday (Wednesday, not in data)', () => {
    expect(holiday.isPublicHoliday('2025-12-31')).toBe(false)
    expect(holiday.isWorkday('2025-12-31')).toBe(true)
  })

  it('2026-01-01 is recognized as 元旦 (data spans years correctly)', () => {
    expect(holiday.isPublicHoliday('2026-01-01')).toBe(true)
    expect(holiday.publicHolidayName('2026-01-01')).toBe('元旦')
  })

  it('2026-01-04 is an adjusted workday on Sunday', () => {
    expect(holiday.isPublicWorkday('2026-01-04')).toBe(true)
    expect(holiday.isWorkday('2026-01-04')).toBe(true)
    expect(holiday.publicHolidayName('2026-01-04')).toBe(null)
  })
})

describe('Public holiday on weekend', () => {
  it('2022-10-01 (Saturday) is both weekend and National Day → still holiday', () => {
    const d = new Date(2022, 9, 1)
    expect(holiday.isPublicHoliday(d)).toBe(true)
    expect(holiday.isPublicWorkday(d)).toBe(false)
    expect(holiday.isHoliday(d)).toBe(true)
    expect(holiday.isWorkday(d)).toBe(false)
  })
})

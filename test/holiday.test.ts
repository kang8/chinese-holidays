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

  it('2022-10-01 is public workday', () => {
    expect(holiday.isPublicHoliday(new Date('2022-10-1'))).toBe(true)
    expect(holiday.publicHolidayName(new Date('2022-10-1'))).toBe('国庆节')
  })

  it('2023-10-01 is public workday', () => {
    expect(holiday.isPublicHoliday(new Date('2023-10-1'))).toBe(true)
    expect(holiday.publicHolidayName(new Date('2023-10-1'))).toBe('中秋节、国庆节')
  })

  it('2023-12-31 is public holiday', () => {
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
    it('2022-10-10 should be false (National Day holiday period)', () => {
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

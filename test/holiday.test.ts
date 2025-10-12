import { describe, it, expect } from 'vitest'
import { holiday } from '../src/index'

describe('class', () => {
  it('class setup', () => {
    expect(holiday.data[2022]['2022-01-01'].type).toBe('publicHoliday')
  })

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

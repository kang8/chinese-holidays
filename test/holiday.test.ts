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

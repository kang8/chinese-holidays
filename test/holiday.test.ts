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
  })

  it('2022-10-08 is holiday', () => {
    expect(holiday.isHoliday(new Date('2022-10-08'))).toBe(true)
  })

  it('2022-06-19 is not public holiday', () => {
    expect(holiday.isPublicHoliday(new Date('2022-06-19'))).toBe(false)
  })

  it('2022-06-19 is not public workday', () => {
    expect(holiday.isPublicWorkday(new Date('2022-06-19'))).toBe(false)
  })
})

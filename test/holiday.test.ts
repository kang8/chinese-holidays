import { describe, it, expect } from 'vitest'
import { holiday } from '../src/index'

describe('test class', () => {
  it('Hello', () => {
    expect(holiday.data[2022]['2022-01-01'].type).toBe('holiday')
  })
})

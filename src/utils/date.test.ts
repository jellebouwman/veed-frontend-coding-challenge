import { after, before } from "node:test";
import { getLastSevenDaysString } from "./date";
import { expect, test, vi, describe } from 'vitest'

describe('getLastSevenDaysString', () => {
  test('it should return a string in the format yyyy-MM-dd', () => {
    const date = getLastSevenDaysString()
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  test('it should return a date that is seven days before today', () => {
    before(() => {
      vi.useFakeTimers()
    })

    after(() => {
      vi.useRealTimers()
    })

    vi.setSystemTime(new Date('2021-01-08'))

    const date = getLastSevenDaysString()

    expect(date).toEqual('2021-01-01')
  })
})
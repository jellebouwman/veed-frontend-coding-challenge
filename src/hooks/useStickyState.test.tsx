import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, test } from 'vitest'
import { useStickyState } from './useStickyState'

describe('useStickyState', () => {
  test('it should return the default value if no value is found in localStorage', () => {
    const { result } = renderHook(() => useStickyState<number>(0, 'test'))

    expect(result.current[0]).toEqual(0)
  })

  test('using the setter should update the value in localStorage', () => {
    const { result, rerender } = renderHook(() => useStickyState<number>(0, 'test'))

    const [, setValue] = result.current

    setValue(1)
    rerender()

    const [value] = result.current

    expect(value).toEqual(1)
    expect(window.localStorage.getItem('test')).toEqual('1')
  })
})

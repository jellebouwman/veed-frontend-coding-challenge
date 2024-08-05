'use client'
import { useEffect, useState } from 'react'

// Yanked from: https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
// Added some type annotations,
// and made this compatible with SSR where window is not defined.
export function useStickyState<T>(defaultValue: T, key: string): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue
    } else {

      const stickyValue = window.localStorage.getItem(key)

      return stickyValue !== null ? (JSON.parse(stickyValue) as T) : defaultValue
    }

  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
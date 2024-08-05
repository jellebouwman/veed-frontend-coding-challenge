import { describe, expect, test, vi } from 'vitest'
import { z } from 'zod'
import { fetchFromApi } from './api'

describe('fetchFromApi', () => {
  const fetchSpy = vi.spyOn(global, 'fetch')

  test('it should fetch and parse the response with the supplied schema', async () => {
    fetchSpy.mockResolvedValue({
      json: async () => ({ id: 1, name: 'John Doe' }),
    } as any)

    const schema = z.object({
      id: z.number(),
      name: z.string(),
    })

    const data = await fetchFromApi('https://someurl.com', schema)
    expect(data).toEqual({ id: 1, name: 'John Doe' })
  })

  test('it should throw an error if the response does not match the schema', async () => {
    fetchSpy.mockResolvedValue({
      json: async () => ({ id: 'not a number', name: 'John Doe' }),
    } as any)

    const schema = z.object({
      id: z.number(),
      name: z.string(),
    })

    expect(async () => await fetchFromApi('https://someurl.com', schema)).rejects.toThrowError(
      'Error parsing API response:'
    )
  })
})

import z from 'zod';

export async function fetchFromApi<T>(url: string, schema: z.ZodType<T>, fetchOptions: RequestInit = {}): Promise<T> {
  const finalUrl = new URL(url).toString()

  try {
    const response = await fetch(finalUrl, fetchOptions)
    const data = await response.json()

    return schema.parse(data)

  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Error parsing API response: ${error}`)
    } else if (error instanceof Error) {
      console.log({ error })
      throw new Error(`Error fetching from API: ${error.message}`)
    } else {
      console.error(error)
      throw new Error('Unknown error')
    }
  }
}
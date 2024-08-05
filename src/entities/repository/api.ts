import { fetchFromApi } from "../../utils/api"
import { z } from "zod"
import { Repository, repositorySchema } from "."
import { getLastSevenDaysString } from "../../utils/date"

const BASE_URL = "https://api.github.com/search/repositories"

const fetchRepositoriesSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(repositorySchema)
})

export async function fetchNewAndTrendingRepositories(): Promise<Repository[]> {
  const url = new URL(BASE_URL)
  url.searchParams.append("q", `created:>${getLastSevenDaysString()}`)
  url.searchParams.append("sort", "stars")
  url.searchParams.append("order", "desc")

  try {
    const response = await fetchFromApi(url.toString(), fetchRepositoriesSchema)

    return response.items
  } catch (error) {
    throw error
  }
}

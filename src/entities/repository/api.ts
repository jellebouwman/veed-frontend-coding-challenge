import { fetchFromApi } from "@/utils/api"
import { z } from "zod"
import { Repository, repositorySchema } from "."

const url = "https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc"

const fetchRepositoriesSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(repositorySchema)
})

export async function fetchNewAndTrendingRepositories(): Promise<Repository[]> {
  try {
    const response = await fetchFromApi(url, fetchRepositoriesSchema)

    return response.items
  } catch (error) {
    throw error
  }
}

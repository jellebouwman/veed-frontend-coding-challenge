import { render, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import Providers from '../app/providers'
import type { Repository } from '../entities/repository'
import { generateRepository } from '../entities/repository/fixtures'
import Repositories from './Repositories'

const FIRST_REPO_NAME = 'my-repo'
const SECOND_REPO_NAME = 'your-repo'

const mockRepositories: Repository[] = [
  generateRepository({ id: 1, name: FIRST_REPO_NAME }),
  generateRepository({ id: 2, name: SECOND_REPO_NAME }),
]

const fetchNewAndTrendingRepositories = vi.hoisted(() => vi.fn())

vi.mock('../entities/repository/api.ts', () => ({
  fetchNewAndTrendingRepositories,
}))

describe('Repositories', () => {
  test('it should display repositories and filter them', async () => {
    fetchNewAndTrendingRepositories.mockResolvedValue(mockRepositories)

    const { getByRole, rerender } = render(
      <Providers>
        <Repositories />
      </Providers>
    )

    await waitFor(() => {
      expect(getByRole('heading', { name: FIRST_REPO_NAME })).toBeTruthy()
      expect(getByRole('heading', { name: SECOND_REPO_NAME })).toBeTruthy()
    })

    const likeButton = getByRole('button', { name: `Like ${FIRST_REPO_NAME}` })
    const showOnlyLikedCheckbox = getByRole('checkbox', { name: 'Show only liked repositories' })

    likeButton.click()
    showOnlyLikedCheckbox.click()

    rerender(
      <Providers>
        <Repositories />
      </Providers>
    )

    await waitFor(() => {
      expect(getByRole('heading', { name: FIRST_REPO_NAME })).toBeTruthy()
      expect(() => getByRole('heading', { name: SECOND_REPO_NAME })).toThrowError()
    })
  })
})

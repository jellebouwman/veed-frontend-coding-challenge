import { fireEvent, render } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import RepositoryLikeButton from './RepositoryLikeButton'

describe('RepositoryLikeButton', () => {
  test('clicking the button should call the toggleLike function', () => {
    const toggleLike = vi.fn()
    const { getByRole, rerender } = render(
      <RepositoryLikeButton isLiked={false} repositoryId={1} repositoryName={'my-repo'} toggleLike={toggleLike} />
    )
    const button = getByRole('button')
    expect(getByRole('button', { name: 'Like my-repo' })).toBeTruthy()

    fireEvent.click(button)

    expect(toggleLike).toHaveBeenCalled
    rerender(
      <RepositoryLikeButton isLiked={true} repositoryId={1} repositoryName={'my-repo'} toggleLike={toggleLike} />
    )
    expect(getByRole('button', { name: 'Unlike my-repo' })).toBeTruthy()
  })
})

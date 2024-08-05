import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

interface RepositoryLikeButtonProps {
  className?: string
  isLiked: boolean
  repositoryId: number
  repositoryName: string
  toggleLike: (repositoryId: number) => void
}

function RepositoryLikeButton({
  className = '',
  isLiked,
  repositoryId,
  repositoryName,
  toggleLike
}: RepositoryLikeButtonProps) {
  const classNames = twMerge(`h-6 w-6 text-yellow-500`, className)

  return (
    <button aria-label={
      `${isLiked ? 'Unlike' : 'Like'} ${repositoryName}`
    } onClick={() => toggleLike(repositoryId)}>
      {isLiked ? <SolidStarIcon className={classNames} /> : <OutlineStarIcon className={classNames} />}
    </button>
  )
}

export default RepositoryLikeButton

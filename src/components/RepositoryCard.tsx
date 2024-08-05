'use client'
import Link from 'next/link'
import { Repository } from '../entities/repository'
import RepositoryLikeButton from './RepositoryLikeButton'

const DESCRIPTION_CHARACTERS_LIMIT = 120

interface RepositoryCardProps {
  isLiked: boolean
  onToggleLike: (repositoryId: number) => void
  repository: Repository
}

function RepositoryCard({ isLiked, onToggleLike, repository }: RepositoryCardProps) {
  return (
    <div className="rounded p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-md font-bold md:text-lg">
          <Link
            className="whitespace-break-spaces hover:underline focus:underline"
            href={repository.html_url}
            target="_blank"
          >
            {repository.name}
          </Link>
        </h2>
        {
          <RepositoryLikeButton
            isLiked={isLiked}
            repositoryName={repository.name}
            repositoryId={repository.id}
            toggleLike={onToggleLike}
          />
        }
      </div>
      <span className="whitespace-nowrap">{repository.stargazers_count} stars</span>
      {repository.description && (
        <p>
          {repository.description.length > DESCRIPTION_CHARACTERS_LIMIT + 3
            ? `${repository.description.substring(0, DESCRIPTION_CHARACTERS_LIMIT)}...`
            : repository.description}
        </p>
      )}
    </div>
  )
}

export default RepositoryCard

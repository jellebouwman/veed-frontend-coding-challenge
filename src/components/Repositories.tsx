'use client'

import { fetchNewAndTrendingRepositories } from '../entities/repository/api';
import {
  useQuery
} from '@tanstack/react-query'
import RepositoryCard from './RepositoryCard';
import { useStickyState } from '../hooks/useStickyState';

function LoadingRepositories() {
  return (
    <div className="px-4 py-8 bg-gray-200 animate-pulse rounded-lg shadow-md">
      <h2 className="text-lg text-center font-semibold text-gray-800">Loading repositories...</h2>
    </div>
  )
}

function NoResults() {
  return (
    <div className="px-4 py-8 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-lg text-center font-semibold text-gray-800">No results</h2>
    </div>
  )
}


function Repositories() {
  const { data, error, isLoading } = useQuery({ queryFn: fetchNewAndTrendingRepositories, queryKey: ['repositories'] })
  const [showOnlyLiked, setShowOnlyLiked] = useStickyState(false, 'showOnlyLiked')
  const [likedRepositories, setLikedRepositories] = useStickyState<number[]>([], 'likedRepositories')

  const likedRepositoriesSet = new Set(likedRepositories)

  function toggleLikeRepository(repositoryId: number) {
    const setCopy = new Set(likedRepositories)
    if (setCopy.has(repositoryId)) {
      setCopy.delete(repositoryId)
    } else {
      setCopy.add(repositoryId)
    }

    setLikedRepositories(Array.from(setCopy))
  }

  if (isLoading) {
    return <LoadingRepositories />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data || data.length === 0) {
    return <NoResults />
  }

  const filteredData = showOnlyLiked ? data.filter((repository) => likedRepositoriesSet.has(repository.id)) : data

  return (
    <div className='flex flex-col gap-8'>
      <label className='flex items-center gap-8  self-end'>
        Show only liked repositories

        <input
          name="showOnlyLiked"
          checked={showOnlyLiked}
          onChange={() => setShowOnlyLiked(!showOnlyLiked)}
          type="checkbox"
        />
      </label>
      {
        filteredData.length === 0 ? <NoResults /> :
          (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredData.map((repository) => (
                <RepositoryCard key={repository.id} isLiked={likedRepositoriesSet.has(repository.id)} repository={repository} onToggleLike={toggleLikeRepository} />
              ))}
            </div>
          )}
    </div>
  );
}

export default Repositories;
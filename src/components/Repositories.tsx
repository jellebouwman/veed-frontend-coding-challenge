'use client'

import { fetchNewAndTrendingRepositories } from '@/entities/repository/api';
import {
  useQuery
} from '@tanstack/react-query'
import RepositoryCard from './RepositoryCard';

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

  if (isLoading) {
    return <LoadingRepositories />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data || data.length === 0) {
    return <NoResults />
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {data.map((repository) => (
        <RepositoryCard key={repository.id} repository={repository} />
      ))}
    </div>
  );
}

export default Repositories;
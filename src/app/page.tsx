'use client';
import { fetchNewAndTrendingRepositories } from '@/entities/repository/api';
import {
  useQuery
} from '@tanstack/react-query'


export default function Home() {
  const { data, error } = useQuery({ queryFn: fetchNewAndTrendingRepositories, queryKey: ['repositories'] })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Veed Frontend Coding Challenge</h1>
      {error && <div>Error: {error.message}</div>}
      <pre>{JSON.stringify(data)}</pre>
    </main>
  );
}

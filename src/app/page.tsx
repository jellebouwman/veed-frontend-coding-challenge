import Repositories from '../components/Repositories'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <h1 className="mb-8 text-4xl font-bold">New and trending GitHub repositories ⭐️</h1>
      <Repositories />
    </main>
  )
}

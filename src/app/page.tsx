import Repositories from "../components/Repositories";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <h1 className="text-4xl font-bold mb-8">New and trending GitHub repositories ⭐️</h1>
      <Repositories />
    </main>
  );
}

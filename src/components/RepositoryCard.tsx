import { Repository } from "@/entities/repository";
import Link from "next/link";

const DESCRIPTION_CHARACTERS_LIMIT = 120;

interface RepositoryCardProps {
  repository: Repository;
}

function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className="rounded shadow-md p-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-md md:text-lg font-bold">
          <Link className="hover:underline focus:underline whitespace-break-spaces" href={repository.html_url} target="_blank">{repository.name}</Link>
        </h2>
        <span className="bg-black self-start text-amber-400 rounded p-2 font-bold whitespace-nowrap shrink-0">{repository.stargazers_count} ⭐️s</span>
      </div>
      {repository.description && <p>{repository.description.length > DESCRIPTION_CHARACTERS_LIMIT + 3 ? `${repository.description.substring(0, DESCRIPTION_CHARACTERS_LIMIT)}...` : repository.description}</p>}
    </div>
  );
}

export default RepositoryCard
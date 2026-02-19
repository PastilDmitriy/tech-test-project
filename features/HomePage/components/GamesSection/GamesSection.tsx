import Link from "next/link";
import type { Game } from "@/types/game";
import { GameCard } from "@/components/GameCard";

interface GamesSectionProps {
  title: string;
  totalCount: number;
  games: Game[];
  seeAllHref: string;
}

export const GamesSection = ({
  title,
  totalCount,
  games,
  seeAllHref,
}: GamesSectionProps) => {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {title}
          <span className="ml-2 font-normal text-base-content/70">
            ({totalCount})
          </span>
        </h2>
        <Link href={seeAllHref} className="btn btn-primary btn-sm">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
};

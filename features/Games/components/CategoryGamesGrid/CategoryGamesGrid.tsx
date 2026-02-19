"use client";

import { useState } from "react";
import type { Game } from "@/types/game";
import { GameCard } from "@/components/GameCard";

const INITIAL_LIMIT = 24;
const LOAD_MORE_LIMIT = 12;

interface CategoryGamesGridProps {
  category: string;
  initialGames: Game[];
}

export const CategoryGamesGrid = ({
  category,
  initialGames,
}: CategoryGamesGridProps) => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [offset, setOffset] = useState(INITIAL_LIMIT);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialGames.length === INITIAL_LIMIT);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/games/${category}?limit=${LOAD_MORE_LIMIT}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const nextGames = (await res.json()) as Game[];

      if (nextGames.length < LOAD_MORE_LIMIT) {
        setHasMore(false);
      }

      setGames((prev) => [...prev, ...nextGames]);
      setOffset((prev) => prev + nextGames.length);
    } catch {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "See more"}
          </button>
        </div>
      )}
    </>
  );
};

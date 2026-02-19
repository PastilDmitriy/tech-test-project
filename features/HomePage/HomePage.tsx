import React from "react";
import type { Game } from "@/types/game";
import { GameCard } from "./components/GameCard";
import gamesData from "@/mocks/games.json";

const games = gamesData as Game[];

const GAMES_TO_SHOW = 12;

export const HomePage = () => {
  const displayedGames = games.slice(0, GAMES_TO_SHOW);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">Games</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {displayedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

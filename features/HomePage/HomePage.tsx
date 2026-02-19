import { getGamesByCategory } from "@/services/games/readGames";
import { GamesSection } from "./components/GamesSection";

const SLOTS_LIMIT = 6;

export const HomePage = async () => {
  const slots = getGamesByCategory("slots", SLOTS_LIMIT);

  return (
    <div className="container mx-auto px-4 py-8">
      <GamesSection title="Slots" games={slots} seeAllHref="/games/slots" />
    </div>
  );
};

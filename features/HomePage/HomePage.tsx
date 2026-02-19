import { getBaseUrl } from "@/lib/getBaseUrl";
import { getCategories, getGamesFromApi } from "@/services/games";
import { GamesSection } from "./components/GamesSection";

const GAMES_PER_SECTION = 6;

export const HomePage = async () => {
  const baseUrl = await getBaseUrl();
  const categories = await getCategories(baseUrl);

  const sections = await Promise.all(
    categories.map(async (category) => {
      const games = await getGamesFromApi(
        baseUrl,
        category.id,
        GAMES_PER_SECTION
      );
      return (
        <GamesSection
          key={category.id}
          title={category.name}
          games={games}
          seeAllHref={`/games/${category.id}`}
        />
      );
    })
  );

  return <>{sections}</>;
};

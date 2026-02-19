import { getGamesByCategory } from "./readGames";
import { readCategoriesFromFile } from "./readCategories";
import type { Game } from "@/types/game";

function matchesQuery(game: Game, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  return game.name.toLowerCase().includes(q);
}

export function searchGames(
  options: {
    query?: string;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}
): Game[] {
  const { query = "", category, limit = 8, offset = 0 } = options;

  const categories = readCategoriesFromFile();
  const categoryIds = category ? [category] : categories.map((c) => c.id);

  const results: Game[] = [];
  let skipped = 0;

  for (const catId of categoryIds) {
    if (results.length >= limit) break;

    const games = getGamesByCategory(catId);
    const filtered = query.trim()
      ? games.filter((g) => matchesQuery(g, query))
      : games;

    for (const game of filtered) {
      if (skipped < offset) {
        skipped++;
        continue;
      }
      results.push(game);
      if (results.length >= limit) break;
    }
  }

  return results;
}

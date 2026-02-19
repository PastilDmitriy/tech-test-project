import fs from "fs";
import path from "path";
import type { Game } from "@/types/game";

const VALID_CATEGORIES = [
  "slots",
  "table-games",
  "virtual-sports",
  "live-casino",
  "crash-games",
  "scratch",
  "fixed-odds",
  "poker",
  "sportsbook",
];

export function getGamesByCategory(
  category: string,
  limit?: number,
  offset?: number
): Game[] {
  if (!VALID_CATEGORIES.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const filePath = path.join(
    process.cwd(),
    "mocks",
    "games",
    `${category}.json`
  );
  const games = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  if (offset !== undefined && limit !== undefined) {
    return games.slice(offset, offset + limit);
  }
  if (limit !== undefined) {
    return games.slice(0, limit);
  }
  return games;
}

export function getGamesCountByCategory(category: string): number {
  return getGamesByCategory(category).length;
}

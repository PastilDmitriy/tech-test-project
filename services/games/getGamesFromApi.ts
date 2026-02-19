import type { Game } from "@/types/game";

export async function getGamesFromApi(
  baseUrl: string,
  category: string,
  limit: number
): Promise<Game[]> {
  const res = await fetch(`${baseUrl}/api/games/${category}?limit=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch games for category: ${category}`);
  }

  return res.json();
}

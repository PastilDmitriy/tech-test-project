import { notFound } from "next/navigation";
import { CategoryGamesGrid } from "@/features/Games/components/CategoryGamesGrid";
import { CategoryPageTitle } from "@/features/Games/components/CategoryPageTitle";
import {
  getGamesByCategory,
  getGamesCountByCategory,
} from "@/services/games/readGames";

const INITIAL_LIMIT = 24;

export default async function GamesCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  let initialGames: Awaited<ReturnType<typeof getGamesByCategory>>;
  let totalCount: number;
  try {
    initialGames = getGamesByCategory(category, INITIAL_LIMIT);
    totalCount = getGamesCountByCategory(category);
  } catch {
    notFound();
  }

  return (
    <>
      <CategoryPageTitle categoryId={category} totalCount={totalCount} />
      <CategoryGamesGrid category={category} initialGames={initialGames} />
    </>
  );
}

import { notFound } from "next/navigation";
import { CategoryGamesGrid } from "@/features/Games/components/CategoryGamesGrid";
import { CategoryPageTitle } from "@/features/Games/components/CategoryPageTitle";
import { getGamesByCategory } from "@/services/games/readGames";

const INITIAL_LIMIT = 24;

export default async function GamesCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  let initialGames;
  try {
    initialGames = getGamesByCategory(category, INITIAL_LIMIT);
  } catch {
    notFound();
  }

  return (
    <>
      <CategoryPageTitle categoryId={category} />
      <CategoryGamesGrid category={category} initialGames={initialGames} />
    </>
  );
}

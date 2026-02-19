import type { GameCategory } from "@/types/category";

type CategoriesApiResponse = {
  categories: GameCategory[];
};

export async function getCategories(baseUrl: string): Promise<GameCategory[]> {
  const res = await fetch(`${baseUrl}/api/games/categories`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = (await res.json()) as CategoriesApiResponse;
  return data.categories;
}

"use client";

import { useGameData } from "@/providers";

interface CategoryPageTitleProps {
  categoryId: string;
}

export const CategoryPageTitle = ({ categoryId }: CategoryPageTitleProps) => {
  const { categories } = useGameData();
  const category = categories.find((c) => c.id === categoryId);
  const title = category?.name ?? categoryId;

  return <h1 className="mb-8 text-3xl font-bold">All {title}</h1>;
};

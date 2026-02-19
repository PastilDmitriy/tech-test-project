"use client";

import { useGameData } from "@/providers";

interface CategoryPageTitleProps {
  categoryId: string;
  totalCount: number;
}

export const CategoryPageTitle = ({
  categoryId,
  totalCount,
}: CategoryPageTitleProps) => {
  const { categories } = useGameData();
  const category = categories.find((c) => c.id === categoryId);
  const title = category?.name ?? categoryId;

  return (
    <h1 className="mb-8 text-2xl font-bold md:text-3xl">
      All {title}
      <span className="ml-2 font-normal text-base-content/70">
        ({totalCount})
      </span>
    </h1>
  );
};

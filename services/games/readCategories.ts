import fs from "fs";
import path from "path";
import type { GameCategory } from "@/types/category";

type CategoriesFile = {
  categories: GameCategory[];
};

export function readCategoriesFromFile(): GameCategory[] {
  const filePath = path.join(
    process.cwd(),
    "mocks",
    "games",
    "categories.json"
  );
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as CategoriesFile;
  return data.categories;
}

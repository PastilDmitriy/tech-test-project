import { NextResponse } from "next/server";
import { readCategoriesFromFile } from "@/services/games/readCategories";

export async function GET() {
  const categories = readCategoriesFromFile();

  return NextResponse.json(
    { categories },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    }
  );
}

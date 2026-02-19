import { NextResponse } from "next/server";
import { getGamesCountByCategory } from "@/services/games/readGames";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const count = getGamesCountByCategory(category);

    return NextResponse.json(
      { count },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
        },
      }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith("Invalid category")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
}

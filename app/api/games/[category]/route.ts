import { NextRequest, NextResponse } from "next/server";
import { getGamesByCategory } from "@/services/games/readGames";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");
    const limit = limitParam
      ? Math.min(Math.max(parseInt(limitParam, 10) || 12, 1), 100)
      : undefined;
    const offset =
      offsetParam !== null && offsetParam !== ""
        ? Math.max(parseInt(offsetParam, 10) || 0, 0)
        : undefined;

    const games =
      limit !== undefined && offset !== undefined
        ? getGamesByCategory(category, limit, offset)
        : getGamesByCategory(category, limit);

    return NextResponse.json(games, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    });
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

import { NextRequest, NextResponse } from "next/server";
import { searchGames } from "@/services/games/searchGames";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? undefined;
  const limitParam = searchParams.get("limit");
  const offsetParam = searchParams.get("offset");

  const limit = limitParam
    ? Math.min(Math.max(parseInt(limitParam, 10) || 8, 1), 100)
    : 8;
  const offset =
    offsetParam !== null && offsetParam !== ""
      ? Math.max(parseInt(offsetParam, 10) || 0, 0)
      : 0;

  const games = searchGames({ query: q, category, limit, offset });

  return NextResponse.json(games, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate",
    },
  });
}

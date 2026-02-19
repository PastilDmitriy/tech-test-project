import { render, screen } from "@testing-library/react";
import type { Game } from "@/types/game";
import { CategoryGamesGrid } from "./CategoryGamesGrid";

const mockGames: Game[] = [
  {
    id: "game-1",
    name: "First Game",
    content: {
      thumbnail: {
        url: "https://example.com/1.jpg",
        altText: "First",
        height: 196,
        width: 196,
      },
    },
  },
  {
    id: "game-2",
    name: "Second Game",
    content: {
      thumbnail: {
        url: "https://example.com/2.jpg",
        altText: "Second",
        height: 196,
        width: 196,
      },
    },
  },
];

describe("CategoryGamesGrid", () => {
  it("renders initial games", () => {
    render(<CategoryGamesGrid category="slots" initialGames={mockGames} />);
    expect(screen.getByText("First Game")).toBeInTheDocument();
    expect(screen.getByText("Second Game")).toBeInTheDocument();
  });

  it("does not show See more when fewer games than limit", () => {
    render(<CategoryGamesGrid category="slots" initialGames={mockGames} />);
    expect(
      screen.queryByRole("button", { name: "See more" })
    ).not.toBeInTheDocument();
  });

  it("shows See more when initial games fill the limit", () => {
    const manyGames = Array.from({ length: 24 }, (_, i) => ({
      ...mockGames[0],
      id: `game-${i}`,
      name: `Game ${i}`,
      content: {
        thumbnail: {
          ...mockGames[0].content.thumbnail,
          altText: `Game ${i}`,
        },
      },
    }));

    render(<CategoryGamesGrid category="slots" initialGames={manyGames} />);
    expect(
      screen.getByRole("button", { name: "See more" })
    ).toBeInTheDocument();
  });
});

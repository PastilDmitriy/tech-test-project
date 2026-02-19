import { render, screen } from "@testing-library/react";
import type { Game } from "@/types/game";
import { GameCard } from "./GameCard";

const mockGame: Game = {
  id: "5xmagic",
  name: "5x Magic",
  content: {
    thumbnail: {
      url: "https://example.com/5xmagic.jpg",
      altText: "5x Magic",
      height: 196,
      width: 196,
    },
  },
};

describe("GameCard", () => {
  it("renders game name", () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText("5x Magic")).toBeInTheDocument();
  });

  it("links to play page with game id", () => {
    render(<GameCard game={mockGame} />);
    const link = screen.getByRole("link", { name: /5x Magic/i });
    expect(link).toHaveAttribute("href", "/play/5xmagic");
  });

  it("renders thumbnail with alt text", () => {
    render(<GameCard game={mockGame} />);
    const img = screen.getByAltText("5x Magic");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("5xmagic.jpg"));
  });

  it("uses game name as fallback when altText is missing", () => {
    const gameWithoutAlt: Game = {
      ...mockGame,
      content: {
        thumbnail: {
          ...mockGame.content.thumbnail,
          altText: undefined as unknown as string,
        },
      },
    };
    render(<GameCard game={gameWithoutAlt} />);
    expect(screen.getByAltText("5x Magic")).toBeInTheDocument();
  });
});

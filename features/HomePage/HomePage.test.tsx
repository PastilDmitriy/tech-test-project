import { render, screen } from "@testing-library/react";
import type { Game } from "@/types/game";
import { GamesSection } from "./components/GamesSection";

const mockGames: Game[] = [
  {
    id: "test-1",
    name: "Test Game",
    content: {
      thumbnail: {
        url: "https://example.com/image.jpg",
        altText: "Test",
        height: 196,
        width: 196,
      },
    },
  },
];

describe("GamesSection", () => {
  it("renders the section title and See all button", () => {
    render(
      <GamesSection
        title="Slots"
        totalCount={100}
        games={mockGames}
        seeAllHref="/games/slots"
      />
    );
    expect(screen.getByText("Slots")).toBeInTheDocument();
    expect(screen.getByText("(100)")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See all" })).toBeInTheDocument();
  });

  it("renders game cards", () => {
    render(
      <GamesSection
        title="Slots"
        totalCount={100}
        games={mockGames}
        seeAllHref="/games/slots"
      />
    );
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });

  it("links See all to category page", () => {
    render(
      <GamesSection
        title="Slots"
        totalCount={100}
        games={mockGames}
        seeAllHref="/games/slots"
      />
    );
    const link = screen.getByRole("link", { name: "See all" });
    expect(link).toHaveAttribute("href", "/games/slots");
  });
});

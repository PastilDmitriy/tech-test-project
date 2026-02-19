import { render, screen } from "@testing-library/react";
import { GameDataProvider } from "@/providers";
import { CategoryPageTitle } from "./CategoryPageTitle";

const mockCategories = [
  { id: "slots", name: "Slots", file: "slots.json" },
  { id: "table-games", name: "Table Games", file: "table-games.json" },
];

function renderCategoryPageTitle(categoryId: string, totalCount: number) {
  return render(
    <GameDataProvider categories={mockCategories}>
      <CategoryPageTitle categoryId={categoryId} totalCount={totalCount} />
    </GameDataProvider>
  );
}

describe("CategoryPageTitle", () => {
  it("renders category name from provider", () => {
    renderCategoryPageTitle("slots", 150);
    expect(screen.getByText("All Slots")).toBeInTheDocument();
    expect(screen.getByText("(150)")).toBeInTheDocument();
  });

  it("renders total count", () => {
    renderCategoryPageTitle("table-games", 42);
    expect(screen.getByText("All Table Games")).toBeInTheDocument();
    expect(screen.getByText("(42)")).toBeInTheDocument();
  });

  it("falls back to category id when category not found", () => {
    renderCategoryPageTitle("unknown-category", 0);
    expect(screen.getByText("All unknown-category")).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GameDataProvider } from "@/providers";
import { Search } from "./Search";

const mockCategories = [{ id: "slots", name: "Slots", file: "slots.json" }];

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  ) as jest.Mock;
});

afterEach(() => {
  global.fetch = originalFetch;
});

function renderSearch() {
  return render(
    <GameDataProvider categories={mockCategories}>
      <Search />
    </GameDataProvider>
  );
}

describe("Search", () => {
  it("renders Search button", () => {
    renderSearch();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("opens modal with search UI when button clicked", async () => {
    renderSearch();
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: "Search" })
      ).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText("Search games...")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "All categories" })
    ).toBeInTheDocument();
  });
});

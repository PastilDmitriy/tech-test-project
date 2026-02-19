import { render, screen, fireEvent } from "@testing-library/react";
import { GameDataProvider } from "@/providers";
import { Header } from "./Header";

const mockCategories = [
  { id: "slots", name: "Slots", file: "slots.json" },
  { id: "table-games", name: "Table Games", file: "table-games.json" },
];

function renderHeader() {
  return render(
    <GameDataProvider categories={mockCategories}>
      <Header />
    </GameDataProvider>
  );
}

describe("Header", () => {
  it("renders logo linking to home", () => {
    renderHeader();
    const logo = screen.getByRole("link", { name: "Questplay" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("renders Search button", () => {
    renderHeader();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("renders Log in and Sign up buttons", () => {
    renderHeader();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("opens auth modal when Log in is clicked", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(
      screen.getByRole("dialog", { name: "Coming soon" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Login and sign up functionality would be implemented later."
      )
    ).toBeInTheDocument();
  });

  it("opens auth modal when Sign up is clicked", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
    expect(
      screen.getByRole("dialog", { name: "Coming soon" })
    ).toBeInTheDocument();
  });
});

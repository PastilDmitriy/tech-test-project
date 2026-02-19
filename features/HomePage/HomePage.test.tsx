import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders the games section", () => {
    render(<HomePage />);
    expect(screen.getByText("Games")).toBeInTheDocument();
  });

  it("renders game cards from mocks", () => {
    render(<HomePage />);
    expect(screen.getByText("5x Magic")).toBeInTheDocument();
  });
});

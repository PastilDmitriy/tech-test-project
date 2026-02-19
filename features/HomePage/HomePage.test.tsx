import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders the homepage", () => {
    render(<HomePage />);
    expect(screen.getByText("HomePage")).toBeInTheDocument();
  });
});

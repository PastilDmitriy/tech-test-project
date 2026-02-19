import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders footer links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Careers" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FAQ" })).toBeInTheDocument();
  });

  it("renders Questplay branding", () => {
    render(<Footer />);
    expect(screen.getByText("Questplay")).toBeInTheDocument();
    expect(screen.getByText("Your gaming destination.")).toBeInTheDocument();
  });

  it("renders current year in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} Questplay`))
    ).toBeInTheDocument();
  });

  it("all links point to home", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/");
    });
  });
});

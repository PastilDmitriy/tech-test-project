import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { GoHomeButton } from "./GoHomeButton";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("GoHomeButton", () => {
  it("does not render when on home page", () => {
    mockUsePathname.mockReturnValue("/");
    render(<GoHomeButton />);
    expect(
      screen.queryByRole("link", { name: /go home/i })
    ).not.toBeInTheDocument();
  });

  it("renders Go home link when not on home page", () => {
    mockUsePathname.mockReturnValue("/games/slots");
    render(<GoHomeButton />);
    const link = screen.getByRole("link", { name: /go home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders on category page", () => {
    mockUsePathname.mockReturnValue("/games/table-games");
    render(<GoHomeButton />);
    expect(screen.getByRole("link", { name: /go home/i })).toBeInTheDocument();
  });

  it("renders on play page", () => {
    mockUsePathname.mockReturnValue("/play/5xmagic");
    render(<GoHomeButton />);
    expect(screen.getByRole("link", { name: /go home/i })).toBeInTheDocument();
  });
});

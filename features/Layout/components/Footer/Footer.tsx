import Link from "next/link";

type FooterProps = {
  containerClass?: string;
};

export const Footer = ({
  containerClass = "container mx-auto px-6",
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center border-t border-base-300 bg-base-200 py-8 text-base-content">
      <div className={containerClass}>
        <aside className="grid-flow-col items-center gap-4">
          <div className="grid-flow-col gap-4">
            <Link href="/" className="link-hover link font-bold">
              About
            </Link>
            <Link href="/" className="link-hover link">
              Contact
            </Link>
            <Link href="/" className="link-hover link">
              Careers
            </Link>
            <Link href="/" className="link-hover link">
              FAQ
            </Link>
          </div>
        </aside>
        <aside className="grid-flow-col items-center gap-4">
          <p className="font-bold">Questplay</p>
          <p>Your gaming destination.</p>
          <p>© {currentYear} Questplay. All rights reserved.</p>
        </aside>
      </div>
    </footer>
  );
};

import { Footer } from "./components/Footer";
import { GoHomeButton } from "./components/GoHomeButton";
import { Header } from "./components/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const CONTAINER_CLASS = "container mx-auto px-6";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header containerClass={CONTAINER_CLASS} />
      <main className="flex-1">
        <div className={`${CONTAINER_CLASS} py-8`}>
          <GoHomeButton />
          {children}
        </div>
      </main>
      <Footer containerClass={CONTAINER_CLASS} />
    </div>
  );
};

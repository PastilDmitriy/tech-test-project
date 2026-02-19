"use client";

import Link from "next/link";

type HeaderProps = {
  containerClass?: string;
};

export const Header = ({
  containerClass = "container mx-auto px-6",
}: HeaderProps) => {
  const handleButtonClick = (buttonName: string) => () => {
    console.log(`${buttonName} was clicked`);
  };

  return (
    <header className="navbar sticky top-0 z-50 flex h-[80px] w-full flex-row items-center justify-between border-b border-base-300 bg-base-100/60 backdrop-blur-md">
      <div
        className={`${containerClass} flex w-full items-center justify-between`}
      >
        <div className="navbar-start shrink-0">
          <Link
            href="/"
            className="text-xl font-bold text-base-content hover:text-primary"
          >
            Questplay
          </Link>
        </div>
        <div className="navbar-end flex shrink-0 gap-2">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleButtonClick("Log in")}
          >
            Log in
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleButtonClick("Sign up")}
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
};

"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "../Search";
import { Modal } from "@/components/Modal";

type HeaderProps = {
  containerClass?: string;
};

export const Header = ({
  containerClass = "container mx-auto px-6",
}: HeaderProps) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <header className="navbar sticky top-0 z-50 flex min-h-[80px] w-full flex-row items-start justify-between gap-4 border-b border-base-300 bg-base-100/60 py-4 backdrop-blur-md min-[500px]:items-center min-[500px]:py-0">
        <div
          className={`${containerClass} flex w-full flex-row items-start justify-between gap-4 min-[500px]:items-center`}
        >
          <div className="flex flex-col gap-3 min-[500px]:flex-row min-[500px]:items-center min-[500px]:gap-4">
            <Link
              href="/"
              className="text-lg font-bold text-base-content hover:text-primary md:text-xl"
            >
              Questplay
            </Link>
            <Search />
          </div>
          <div className="flex shrink-0 flex-col gap-2 min-[500px]:flex-row min-[500px]:gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block min-[500px]:inline-flex min-[500px]:w-auto"
              onClick={() => setAuthModalOpen(true)}
            >
              Sign up
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm btn-block min-[500px]:inline-flex min-[500px]:w-auto"
              onClick={() => setAuthModalOpen(true)}
            >
              Log in
            </button>
          </div>
        </div>
      </header>

      <Modal
        id="auth-modal"
        title="Coming soon"
        isOpen={authModalOpen}
        onOpen={() => setAuthModalOpen(true)}
        onClose={() => setAuthModalOpen(false)}
        renderTrigger={() => null}
      >
        <p>Login and sign up functionality would be implemented later.</p>
      </Modal>
    </>
  );
};

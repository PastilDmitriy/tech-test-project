"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "@/components/Modal";
import { useGameData } from "@/providers";
import { GameCard } from "@/components/GameCard";
import type { Game } from "@/types/game";

const RESULTS_PER_PAGE = 8;

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { categories } = useGameData();
  const pathname = usePathname();

  const fetchResults = useCallback(
    async (currentOffset: number, append: boolean) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          limit: String(RESULTS_PER_PAGE),
          offset: String(currentOffset),
        });
        if (query.trim()) params.set("q", query.trim());
        if (categoryId) params.set("category", categoryId);

        const res = await fetch(`/api/games/search?${params}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const nextGames = (await res.json()) as Game[];

        setHasMore(nextGames.length === RESULTS_PER_PAGE);
        setGames((prev) => (append ? [...prev, ...nextGames] : nextGames));
        setOffset(currentOffset + nextGames.length);
      } catch {
        setHasMore(false);
        if (!append) setGames([]);
      } finally {
        setIsLoading(false);
      }
    },
    [query, categoryId]
  );

  useEffect(() => {
    if (isOpen) {
      fetchResults(0, false);
    }
  }, [isOpen, fetchResults]);

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    fetchResults(offset, true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setCategoryId("");
    setGames([]);
    setOffset(0);
  };

  useEffect(() => {
    handleClose();
  }, [pathname]);

  return (
    <Modal
      id="search-modal"
      title="Search"
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={handleClose}
      modalBoxClassName="max-w-2xl"
      renderTrigger={(open) => (
        <button
          type="button"
          className="btn btn-ghost gap-2"
          onClick={open}
          aria-label="Search"
        >
          <SearchIcon />
          Search
        </button>
      )}
    >
      <div className="h-[460px] flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search games..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full"
          autoFocus
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="select select-bordered w-full"
          aria-label="Category"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="h-[322px] overflow-y-auto rounded-lg border border-base-300 bg-base-200/30 p-4">
          {games.length === 0 && !isLoading ? (
            <p className="flex h-full items-center justify-center text-base-content/60">
              No results found
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 min-[500px]:grid-cols-3 md:grid-cols-4">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>

        {hasMore && (
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </Modal>
  );
};

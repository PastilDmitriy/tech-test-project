"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { GameCategory } from "@/types/category";

interface GameDataContextValue {
  categories: GameCategory[];
}

const GameDataContext = createContext<GameDataContextValue | null>(null);

interface GameDataProviderProps {
  categories: GameCategory[];
  children: ReactNode;
}

export function GameDataProvider({
  categories,
  children,
}: GameDataProviderProps) {
  return (
    <GameDataContext.Provider value={{ categories }}>
      {children}
    </GameDataContext.Provider>
  );
}

export function useGameData() {
  const context = useContext(GameDataContext);
  if (!context) {
    throw new Error("useGameData must be used within GameDataProvider");
  }
  return context;
}

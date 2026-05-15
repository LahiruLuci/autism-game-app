"use client";

import { MemoryCardData } from "@/lib/games/memory-match/helpers";
import { MemoryCard } from "./MemoryCard";

interface MemoryCardGridProps {
  cards: MemoryCardData[];
  onCardClick: (cardId: string) => void;
  disabled: boolean;
  gridCols: number;
}

export function MemoryCardGrid({ cards, onCardClick, disabled, gridCols }: MemoryCardGridProps) {
  return (
    <div 
      className={`grid gap-4 md:gap-6 w-full max-w-2xl mx-auto p-4`}
      style={{ 
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` 
      }}
    >
      {cards.map((card) => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={() => onCardClick(card.id)}
          isDisabled={disabled}
        />
      ))}
    </div>
  );
}

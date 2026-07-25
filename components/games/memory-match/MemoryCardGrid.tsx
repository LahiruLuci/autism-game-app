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
  const widthClass =
    gridCols === 2
      ? "max-w-[310px] sm:max-w-[500px] lg:max-w-[620px]"
      : "max-w-[340px] sm:max-w-[680px] lg:max-w-[920px] xl:max-w-[980px]";
  const gridClass =
    gridCols === 2
      ? "grid-cols-2"
      : "grid-cols-3 sm:grid-cols-4";

  return (
    <div
      className={`grid ${gridClass} w-full ${widthClass} mx-auto gap-2 p-1 sm:gap-3 sm:p-2 lg:gap-5 lg:p-3`}
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

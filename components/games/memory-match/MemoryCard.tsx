"use client";

import { motion } from "framer-motion";
import { MemoryCardData } from "@/lib/games/memory-match/helpers";

interface MemoryCardProps {
  card: MemoryCardData;
  onClick: () => void;
  isDisabled: boolean;
}

export function MemoryCard({ card, onClick, isDisabled }: MemoryCardProps) {
  return (
    <div className="relative w-full aspect-square perspective-1000">
      <motion.div
        className="relative h-full w-full preserve-3d transition-transform duration-500"
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={onClick}
          disabled={isDisabled || card.isFlipped || card.isMatched}
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-[1.5rem] border-2 border-white/80 bg-gradient-to-br from-blue-100 to-violet-100 text-2xl shadow-md shadow-blue-900/5 transition-all hover:shadow-lg sm:text-3xl lg:rounded-[1.75rem] lg:text-4xl"
        >
          <span className="text-blue-400/60">✨</span>
        </button>

        <div
          className={`absolute inset-0 z-20 flex backface-hidden rotate-y-180 items-center justify-center rounded-[1.5rem] border-2 text-3xl shadow-lg shadow-blue-900/5 sm:text-4xl lg:rounded-[1.75rem] lg:text-5xl ${card.isMatched ? "border-green-200 bg-green-50" : "border-white bg-white"}`}
        >
          <span className={card.isMatched ? "scale-105" : ""}>{card.icon}</span>
          {card.isMatched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-2 rounded-full bg-green-500 p-1 text-white shadow-lg"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}


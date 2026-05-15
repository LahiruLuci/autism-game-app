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
    <div className="perspective-1000 w-full aspect-square relative">
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-500"
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Card Back (Question Mark / Sparkle) */}
        <button
          onClick={onClick}
          disabled={isDisabled || card.isFlipped || card.isMatched}
          className={`
            absolute inset-0 backface-hidden rounded-3xl md:rounded-[2.5rem]
            bg-gradient-to-br from-blue-100 to-violet-100 border-2 border-white/80
            flex items-center justify-center text-4xl shadow-lg shadow-blue-900/5
            hover:shadow-xl transition-all cursor-pointer z-10
          `}
        >
          <span className="text-blue-400 opacity-60">✨</span>
        </button>

        {/* Card Front (Icon) */}
        <div
          className={`
            absolute inset-0 backface-hidden rotate-y-180 rounded-3xl md:rounded-[2.5rem]
            ${card.isMatched ? 'bg-green-50 border-green-200' : 'bg-white border-white'}
            border-2 flex items-center justify-center text-5xl md:text-6xl
            shadow-xl shadow-blue-900/5 z-20
          `}
        >
          <span className={card.isMatched ? 'scale-110' : ''}>{card.icon}</span>
          {card.isMatched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

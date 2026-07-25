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
    <motion.div
      className="relative aspect-square w-full perspective-1000"
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="relative h-full w-full preserve-3d transition-transform duration-500"
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={onClick}
          disabled={isDisabled || card.isFlipped || card.isMatched}
          className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center overflow-hidden rounded-[1.35rem] border-2 border-white/90 bg-gradient-to-br from-sky-100 via-blue-100 to-violet-100 text-2xl shadow-[0_12px_26px_rgba(37,99,235,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_38px_rgba(37,99,235,0.18)] focus:outline-none focus:ring-4 focus:ring-sky-200/70 disabled:cursor-default disabled:hover:translate-y-0 sm:text-3xl lg:rounded-[1.6rem] lg:text-4xl"
          aria-label="Memory card"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.72),transparent_34%)] opacity-80" />
          <motion.span
            className="relative text-blue-400/65"
            animate={{ scale: [1, 1.08, 1], opacity: [0.65, 0.9, 0.65] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            &#10024;
          </motion.span>
        </button>

        <div
          className={`absolute inset-0 z-20 flex rotate-y-180 backface-hidden items-center justify-center rounded-[1.35rem] border-2 text-3xl shadow-[0_14px_34px_rgba(15,23,42,0.10)] sm:text-4xl lg:rounded-[1.6rem] lg:text-5xl ${
            card.isMatched
              ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white"
              : "border-white bg-white"
          }`}
        >
          <span className={card.isMatched ? "scale-105" : ""}>{card.icon}</span>
          {card.isMatched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-2 rounded-full bg-emerald-500 p-1 text-white shadow-lg"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

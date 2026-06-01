"use client";

import { motion } from "framer-motion";
import { Emotion } from "@/types/games/emotion-face-match";

type EmotionAnswerGridProps = {
  options: Emotion[];
  onAnswer: (emotionId: string) => void;
  disabled: boolean;
  level: number;
};

export function EmotionAnswerGrid({ options, onAnswer, disabled, level }: EmotionAnswerGridProps) {
  // Grid layout logic based on level
  const gridCols = level === 1
    ? "grid-cols-2 max-w-md mx-auto"
    : level === 2
      ? "grid-cols-2 max-w-lg mx-auto"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-5xl mx-auto";

  return (
    <div className={`grid gap-4 sm:gap-6 w-full px-4 ${gridCols}`}>
      {options.map((emotion, index) => (
        <motion.button
          key={emotion.id}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: index * 0.05,
            duration: 0.4,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          whileHover={!disabled ? { scale: 1.05, y: -4 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          disabled={disabled}
          onClick={() => onAnswer(emotion.label)}
          className={`
            group relative flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 transition-all duration-300
            disabled:opacity-40 disabled:cursor-not-allowed
            shadow-sm hover:shadow-xl hover:ring-8 ${emotion.color}
          `}
        >
          {/* Decorative background element */}
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />

          <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-500 drop-shadow-md">
            {emotion.emoji}
          </span>
          <span className="font-black text-xs uppercase tracking-[0.25em] relative z-10">
            {emotion.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

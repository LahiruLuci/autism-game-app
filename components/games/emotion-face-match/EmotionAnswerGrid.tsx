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
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-4xl mx-auto";

  return (
    <div className={`grid gap-4 w-full ${gridCols}`}>
      {options.map((emotion, index) => (
        <motion.button
          key={emotion.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={!disabled ? { scale: 1.02, translateY: -2 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          disabled={disabled}
          onClick={() => onAnswer(emotion.label)}
          className={`group flex flex-col items-center gap-3 p-6 rounded-[2rem] border-2 border-transparent shadow-sm transition-all disabled:opacity-50 ${emotion.color}`}
        >
          <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
            {emotion.emoji}
          </span>
          <span className="font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">
            {emotion.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

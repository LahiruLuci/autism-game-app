"use client";

import { motion } from "framer-motion";
import { EmotionId } from "@/types/games/emotion-face-match";
import { EMOTIONS } from "@/lib/games/emotion-face-match/emotions";

type StoryAnswerGridProps = {
  options: EmotionId[];
  onAnswer: (emotionId: EmotionId) => void;
  disabled: boolean;
};

export function StoryAnswerGrid({ options, onAnswer, disabled }: StoryAnswerGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-6 w-full mx-auto">
      {options.map((emotionId, index) => {
        const emotion = EMOTIONS[emotionId];
        return (
          <motion.button
            key={emotionId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            disabled={disabled}
            onClick={() => onAnswer(emotionId)}
            className={`
              group relative flex flex-col items-center justify-center gap-8 
              p-6 sm:p-12 lg:p-14 rounded-[2rem] sm:rounded-[4rem] border-8 border-white shadow-xl 
              transition-all duration-500 disabled:opacity-50 
              ${emotion.color} overflow-hidden
            `}
          >
            <span className="text-7xl sm:text-8xl transition-all duration-700 group-hover:scale-110">
              {emotion.emoji}
            </span>
            <span className="font-black text-lg sm:text-xl uppercase tracking-[0.2em] text-slate-800/80">
              {emotion.label}
            </span>

            {/* Visual selection hint */}
            <div className="absolute inset-0 border-8 border-transparent group-hover:border-white/40 rounded-[4rem] transition-colors" />
          </motion.button>
        );
      })}
    </div>
  );
}

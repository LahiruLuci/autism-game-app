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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl mx-auto">
      {options.map((emotionId, index) => {
        const emotion = EMOTIONS[emotionId];
        return (
          <motion.button
            key={emotionId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={!disabled ? { scale: 1.05, translateY: -5 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            disabled={disabled}
            onClick={() => onAnswer(emotionId)}
            className={`group flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border-2 border-transparent shadow-sm transition-all disabled:opacity-50 ${emotion.color}`}
          >
            <span className="text-4xl group-hover:rotate-12 transition-transform duration-300">
              {emotion.emoji}
            </span>
            <span className="font-bold text-sm tracking-wide">
              {emotion.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

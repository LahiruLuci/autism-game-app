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
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-6 w-full mx-auto">
      {options.map((emotion, index) => (
        <motion.button
          key={emotion.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.05,
            duration: 0.8,
            ease: "easeInOut"
          }}
          whileHover={!disabled ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
          disabled={disabled}
          onClick={() => onAnswer(emotion.label)}
          className={`
            group relative flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 
            rounded-[2rem] sm:rounded-[3rem] border-4 transition-all duration-500
            disabled:opacity-40 disabled:cursor-not-allowed
            shadow-xl ${emotion.color} border-white
          `}
        >
          <span className="font-black text-2xl sm:text-3xl uppercase tracking-[0.2em] relative z-10 text-slate-800/80">
            {emotion.label}
          </span>

          {/* Visual selection hint */}
          <div className="absolute inset-0 border-8 border-transparent group-hover:border-white/40 rounded-[3rem] transition-colors" />
        </motion.button>
      ))}
    </div>
  );
}

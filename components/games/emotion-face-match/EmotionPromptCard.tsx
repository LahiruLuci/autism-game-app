"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Emotion } from "@/types/games/emotion-face-match";

type EmotionPromptCardProps = {
  emotion: Emotion;
  feedbackVisible: boolean;
};

export function EmotionPromptCard({ emotion, feedbackVisible }: EmotionPromptCardProps) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={emotion.id}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -10 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-48 h-48 sm:w-64 sm:h-64 rounded-[4rem] bg-white border border-slate-100 shadow-2xl shadow-blue-900/5 flex items-center justify-center text-8xl sm:text-9xl"
        >
          {emotion.emoji}
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-blue-100/20 blur-3xl -z-10 rounded-full" />
    </div>
  );
}

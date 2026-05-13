"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Emotion } from "@/types/games/emotion-face-match";

import { EmotionQuestion } from "@/types/games/emotion-face-match";

type EmotionPromptCardProps = {
  question: EmotionQuestion;
  feedbackVisible: boolean;
};

export function EmotionPromptCard({ question, feedbackVisible }: EmotionPromptCardProps) {
  const isFace = question.promptType === "face";

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -10 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className={`w-full min-h-[16rem] sm:min-h-[20rem] rounded-[3rem] bg-white border border-slate-100 shadow-2xl shadow-blue-900/5 flex items-center justify-center p-8 text-center`}
        >
          {isFace ? (
            <span className="text-8xl sm:text-9xl">{question.visual}</span>
          ) : (
            <div className="space-y-4">
              <span className="text-4xl mb-4 block">📖</span>
              <p className="text-2xl sm:text-3xl font-display font-bold text-slate-800 leading-tight">
                "{question.situation}"
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-blue-100/10 blur-3xl -z-10 rounded-full" />
    </div>
  );
}

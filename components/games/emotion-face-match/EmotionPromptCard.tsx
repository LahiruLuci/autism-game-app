"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EmotionQuestion } from "@/types/games/emotion-face-match";

type EmotionPromptCardProps = {
  question: EmotionQuestion;
  feedbackVisible: boolean;
};

export function EmotionPromptCard({ question, feedbackVisible }: EmotionPromptCardProps) {
  const isFace = question.promptType === "face";

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center gap-6"
        >
          {/* Illustration Area */}
          <div className="h-28 sm:h-32 flex items-center justify-center text-7xl sm:text-8xl">
            <motion.span
              key={isFace ? question.visual : "text"}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {isFace ? question.visual : "📖"}
            </motion.span>
          </div>

          {/* Situation Text (if applicable) */}
          {!isFace && (
            <div className="px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                "{question.situation}"
              </h2>
            </div>
          )}

          {/* Question Label */}
          <div className="pt-2">
            <span className="px-6 py-2 rounded-full bg-slate-100 text-slate-500 font-black text-xs uppercase tracking-[0.2em]">
              How do they feel?
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -20 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          className={`
            w-full min-h-[16rem] sm:min-h-[22rem] rounded-[3.5rem] p-10 text-center
            bg-white/70 backdrop-blur-2xl border border-white/80 shadow-premium
            flex flex-col items-center justify-center relative overflow-hidden
          `}
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-transparent to-purple-50/10 pointer-events-none" />

          {isFace ? (
            <motion.span
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative z-10 text-[9rem] sm:text-[11rem] drop-shadow-xl select-none"
            >
              {question.visual}
            </motion.span>
          ) : (
            <div className="space-y-6 relative z-10">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mx-auto shadow-sm"
              >
                📖
              </motion.div>
              <p className="text-2xl sm:text-4xl font-display font-medium text-slate-800 leading-[1.3] px-4">
                "{question.situation}"
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dynamic Aura background */}
      <div className="absolute inset-0 bg-blue-100/20 blur-[100px] -z-10 rounded-full animate-pulse-slow" />
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { EmotionQuestion } from "@/types/games/emotion-face-match";

type EmotionPromptCardProps = {
  question: EmotionQuestion;
  feedbackVisible: boolean;
  compact?: boolean;
};

const MOOD_IMAGES = {
  happy: "/images/mood/happy.png",
  sad: "/images/mood/sad.png",
  angry: "/images/mood/angry.png",
  surprised: "/images/mood/surprise.png",
  scared: "/images/mood/scared.png",
} as const;

export function EmotionPromptCard({
  question,
  compact = false,
}: EmotionPromptCardProps) {
  const isFace = question.promptType === "face";
  const moodImage =
    MOOD_IMAGES[question.correctAnswer as keyof typeof MOOD_IMAGES];

  if (compact) {
    return (
      <div className="h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            {isFace && moodImage ? (
              <div className="relative mx-auto aspect-square w-full max-w-[310px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
                <Image
                  src={moodImage}
                  alt="Child showing a feeling"
                  fill
                  priority
                  sizes="(max-width: 640px) 78vw, 310px"
                  className="object-cover"
                />
              </div>
            ) : !isFace ? (
              <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 text-center shadow-sm">
                <span aria-hidden="true" className="text-6xl">📖</span>
                <h2 className="text-xl font-black leading-snug text-slate-900 sm:text-2xl">
                  {question.situation}
                </h2>
              </div>
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-[1.75rem] border border-blue-100 bg-blue-50 text-8xl">
                {question.visual}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8 }}
          className="flex w-full flex-col items-center gap-6"
        >
          <div className="flex h-28 items-center justify-center text-7xl sm:h-32 sm:text-8xl">
            {isFace && moodImage ? (
              <motion.div
                key={moodImage}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-28 w-28 overflow-hidden rounded-[2rem] bg-white shadow-sm sm:h-32 sm:w-32"
              >
                <Image
                  src={moodImage}
                  alt="Child showing a feeling"
                  fill
                  priority
                  sizes="128px"
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <motion.span
                key={isFace ? question.visual : "text"}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {isFace ? question.visual : "📖"}
              </motion.span>
            )}
          </div>

          {!isFace && (
            <div className="px-6 text-center">
              <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
                &ldquo;{question.situation}&rdquo;
              </h2>
            </div>
          )}

          <div className="pt-2">
            <span className="rounded-full bg-slate-100 px-6 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              How do they feel?
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

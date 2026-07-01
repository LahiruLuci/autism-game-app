"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { EmotionId } from "@/types/games/emotion-face-match";
import { EMOTIONS } from "@/lib/games/emotion-face-match/emotions";

type StoryAnswerGridProps = {
  options: EmotionId[];
  onAnswer: (emotionId: EmotionId) => void;
  disabled: boolean;
  selectedEmotion: EmotionId | null;
  correctEmotion: EmotionId;
  feedbackType: "correct" | "incorrect" | null;
};

const MOOD_IMAGES: Partial<Record<EmotionId, string>> = {
  happy: "/images/mood/happy.png",
  sad: "/images/mood/sad.png",
  angry: "/images/mood/angry.png",
  surprised: "/images/mood/surprise.png",
  scared: "/images/mood/scared.png",
};

export function StoryAnswerGrid({
  options,
  onAnswer,
  disabled,
  selectedEmotion,
  correctEmotion,
  feedbackType,
}: StoryAnswerGridProps) {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((emotionId) => {
        const emotion = EMOTIONS[emotionId];
        const moodImage = MOOD_IMAGES[emotionId];
        const isSelected = selectedEmotion === emotionId;
        const isCorrectSelection = isSelected && feedbackType === "correct";
        const isIncorrectSelection = isSelected && feedbackType === "incorrect";
        const showCorrectAnswer =
          feedbackType === "incorrect" && emotionId === correctEmotion;

        return (
          <motion.button
            key={emotionId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            whileHover={!disabled ? { scale: 1.01 } : undefined}
            whileTap={!disabled ? { scale: 0.98 } : undefined}
            disabled={disabled}
            onClick={() => onAnswer(emotionId)}
            aria-label={emotion.label}
            className={`
              flex min-h-[112px] items-center gap-4 rounded-[1.75rem] border-2 bg-white/95
              px-4 py-3 text-left shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition-all duration-300
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200
              disabled:cursor-default md:min-h-[120px] md:px-5
              ${emotion.color}
              ${isCorrectSelection || showCorrectAnswer ? "border-emerald-400 bg-emerald-50 ring-2 ring-emerald-100" : ""}
              ${isIncorrectSelection ? "border-amber-400 bg-amber-50 ring-2 ring-amber-100" : ""}
              ${disabled && !isSelected && !showCorrectAnswer ? "opacity-60" : "border-white/80 hover:border-orange-200 hover:bg-orange-50/60"}
            `}
          >
            <div className="relative size-[68px] shrink-0 overflow-hidden rounded-[1.25rem] bg-white shadow-sm sm:size-[72px] md:size-20">
              {moodImage ? (
                <Image
                  src={moodImage}
                  alt={`${emotion.label} feeling`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full items-center justify-center text-4xl">
                  {emotion.emoji}
                </span>
              )}
            </div>
            <span className="text-lg font-black text-slate-900 md:text-xl">
              {emotion.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

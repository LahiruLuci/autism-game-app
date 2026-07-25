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

const ANSWER_ACCENTS: Partial<Record<EmotionId, string>> = {
  happy: "from-yellow-50/95 via-amber-50/80 to-white",
  sad: "from-sky-50/95 via-blue-50/80 to-white",
  angry: "from-orange-50/95 via-amber-50/75 to-white",
  scared: "from-violet-50/95 via-purple-50/75 to-white",
  surprised: "from-emerald-50/95 via-teal-50/70 to-white",
};

const ANSWER_GLOWS: Partial<Record<EmotionId, string>> = {
  happy: "bg-yellow-200/30",
  sad: "bg-sky-200/30",
  angry: "bg-orange-200/30",
  scared: "bg-violet-200/30",
  surprised: "bg-emerald-200/30",
};

const MOOD_IMAGES: Partial<Record<EmotionId, string>> = {
  happy: "/images/mood/happy.png",
  sad: "/images/mood/sad.png",
  angry: "/images/mood/angry.png",
  surprised: "/images/mood/surprise.png",
  scared: "/images/mood/scared.png",
};

const STAR_PARTICLES = [
  { left: "10%", top: "18%", size: 28, color: "#FDE68A", x: -36, y: -72, delay: 0 },
  { left: "28%", top: "8%", size: 20, color: "#FFFFFF", x: -14, y: -66, delay: 0.05 },
  { left: "50%", top: "14%", size: 32, color: "#FBBF24", x: 4, y: -78, delay: 0.02 },
  { left: "74%", top: "18%", size: 24, color: "#FEF3C7", x: 32, y: -68, delay: 0.08 },
  { left: "88%", top: "48%", size: 26, color: "#FCD34D", x: 38, y: -54, delay: 0.11 },
  { left: "64%", top: "76%", size: 19, color: "#FFFFFF", x: 18, y: -60, delay: 0.14 },
  { left: "32%", top: "82%", size: 25, color: "#FDE68A", x: -24, y: -58, delay: 0.09 },
  { left: "14%", top: "60%", size: 22, color: "#FBBF24", x: -34, y: -52, delay: 0.16 },
];

const BUBBLE_PARTICLES = [
  { left: "12%", top: "32%", size: 34, color: "rgba(219,234,254,0.95)", x: -28, y: -58, delay: 0 },
  { left: "34%", top: "14%", size: 24, color: "rgba(255,255,255,0.92)", x: -12, y: -62, delay: 0.05 },
  { left: "52%", top: "24%", size: 40, color: "rgba(191,219,254,0.82)", x: 8, y: -60, delay: 0.02 },
  { left: "74%", top: "36%", size: 28, color: "rgba(221,214,254,0.78)", x: 26, y: -50, delay: 0.08 },
  { left: "84%", top: "68%", size: 36, color: "rgba(224,242,254,0.9)", x: 24, y: -48, delay: 0.12 },
  { left: "42%", top: "78%", size: 26, color: "rgba(255,255,255,0.9)", x: -8, y: -50, delay: 0.15 },
];

function StarIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.8l2.35 5.35 5.82.55-4.38 3.87 1.3 5.7L12 15.3l-5.09 2.97 1.3-5.7-4.38-3.87 5.82-.55L12 2.8z"
        fill={color}
      />
    </svg>
  );
}

function AnswerFeedbackParticles({ type }: { type: "correct" | "incorrect" }) {
  const particles = type === "correct" ? STAR_PARTICLES : BUBBLE_PARTICLES;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible" aria-hidden="true">
      {particles.map((particle, index) => (
        <motion.span
          key={`${type}-${index}`}
          className="absolute block"
          style={{ left: particle.left, top: particle.top }}
          initial={{ opacity: 0, scale: 0.72, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.64, 1.12, 0.86], x: particle.x, y: particle.y }}
          transition={{ duration: 1.05, ease: "easeOut", delay: particle.delay }}
        >
          {type === "correct" ? (
            <StarIcon color={particle.color} size={particle.size} />
          ) : (
            <span
              className="block rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_8px_18px_rgba(147,197,253,0.28)] ring-2 ring-white/75"
              style={{ width: particle.size, height: particle.size, background: particle.color }}
            />
          )}
        </motion.span>
      ))}
    </div>
  );
}

export function StoryAnswerGrid({
  options,
  onAnswer,
  disabled,
  selectedEmotion,
  correctEmotion,
  feedbackType,
}: StoryAnswerGridProps) {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 xl:max-w-5xl xl:gap-5">
      {options.map((emotionId) => {
        const emotion = EMOTIONS[emotionId];
        const moodImage = MOOD_IMAGES[emotionId];
        const accent = ANSWER_ACCENTS[emotionId] || "from-white via-orange-50/40 to-white";
        const glow = ANSWER_GLOWS[emotionId] || "bg-orange-200/25";
        const isSelected = selectedEmotion === emotionId;
        const isCorrectSelection = isSelected && feedbackType === "correct";
        const isIncorrectSelection = isSelected && feedbackType === "incorrect";
        const showCorrectAnswer =
          feedbackType === "incorrect" && emotionId === correctEmotion;

        return (
          <motion.button
            key={emotionId}
            initial={{ opacity: 0 }}
            animate={
              isCorrectSelection
                ? { opacity: 1, scale: 1.03, x: 0 }
                : isIncorrectSelection
                  ? { opacity: 1, scale: 1, x: [0, -3, 3, -2, 2, 0] }
                  : { opacity: 1, scale: 1, x: 0 }
            }
            transition={{ duration: isSelected && feedbackType ? 0.7 : 0.25, ease: "easeOut" }}
            whileHover={!disabled ? { scale: 1.025, y: -4 } : undefined}
            whileTap={!disabled ? { scale: 0.98 } : undefined}
            disabled={disabled}
            onClick={() => onAnswer(emotionId)}
            aria-label={emotion.label}
            className={`
              relative flex min-h-[112px] items-center gap-4 overflow-hidden rounded-[1.75rem] border-2 bg-gradient-to-br ${accent} xl:min-h-[148px] xl:gap-6 xl:rounded-[2.25rem]
              px-4 py-3 text-left shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_18px_42px_rgba(251,146,60,0.16)]
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200
              disabled:cursor-default md:min-h-[120px] md:px-5 hover:ring-4 hover:ring-orange-100/70 xl:px-7 xl:py-5
              ${emotion.color}
              ${isCorrectSelection ? "border-emerald-300 bg-yellow-50 ring-4 ring-yellow-100/90 shadow-[0_24px_60px_rgba(250,204,21,0.32)]" : ""}
              ${showCorrectAnswer ? "border-emerald-300 bg-emerald-50 ring-2 ring-emerald-100" : ""}
              ${isIncorrectSelection ? "border-sky-200 bg-sky-50 ring-4 ring-sky-100/80 shadow-[0_20px_52px_rgba(147,197,253,0.28)]" : ""}
              ${disabled && !isSelected && !showCorrectAnswer ? "opacity-60" : "border-white/80 hover:border-orange-200 hover:bg-orange-50/70 hover:shadow-orange-100/80"}
            `}
          >
            {isCorrectSelection && <AnswerFeedbackParticles type="correct" />}
            {isIncorrectSelection && <AnswerFeedbackParticles type="incorrect" />}
            <div className={`pointer-events-none absolute right-5 top-4 size-24 rounded-full blur-2xl ${isCorrectSelection ? "bg-yellow-200/80" : isIncorrectSelection ? "bg-sky-200/65" : glow}`} />
            {isCorrectSelection && (
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(254,240,138,0.34),transparent_45%)]" />
            )}
            <div className="pointer-events-none absolute bottom-4 left-8 size-2 rounded-full bg-white/80 shadow-[28px_10px_0_rgba(255,255,255,0.55),72px_-12px_0_rgba(255,255,255,0.45)]" />
            <div className="relative z-10 size-[68px] shrink-0 overflow-hidden rounded-[1.25rem] bg-white shadow-sm sm:size-[72px] md:size-20 xl:size-24 xl:rounded-[1.6rem]">
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
            <span className="relative z-10 text-lg font-black text-slate-900 md:text-xl xl:text-2xl">
              {emotion.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

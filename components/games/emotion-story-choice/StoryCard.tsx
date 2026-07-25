"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Story } from "@/types/games/emotion-story-choice";

type StoryCardProps = {
  story: Story;
};

export function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={story.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="grid items-center gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 xl:min-h-[330px] xl:grid-cols-[310px_minmax(0,1fr)] xl:gap-10"
        >
          <div className="relative mx-auto flex h-[170px] w-full max-w-[220px] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-50 via-amber-50 to-white px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_40px_rgba(251,146,60,0.08)] sm:h-[190px] md:mx-0 md:h-[210px] md:max-w-none xl:h-[270px] xl:rounded-[2.5rem] xl:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_22px_55px_rgba(251,146,60,0.12)]">
            <div className="pointer-events-none absolute inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.95),transparent_40%),radial-gradient(circle_at_28%_26%,rgba(251,191,36,0.20),transparent_18%),radial-gradient(circle_at_76%_72%,rgba(125,211,252,0.18),transparent_22%)]" />
            <div className="pointer-events-none absolute left-7 top-7 size-3 rounded-full bg-white/70 shadow-[34px_18px_0_rgba(255,255,255,0.45),96px_58px_0_rgba(251,191,36,0.16)]" />
            <span
              aria-hidden="true"
              className="relative z-10 text-[5.5rem] leading-none drop-shadow-[0_16px_24px_rgba(251,146,60,0.12)] sm:text-[6rem] md:text-[6.5rem] xl:text-[8rem]"
            >
              {story.illustration}
            </span>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 text-center md:mx-0 md:items-start md:text-left">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-orange-500 xl:text-xs">
              Read the story
            </p>
            <h2 className="max-w-[18ch] text-balance text-2xl font-black leading-tight text-slate-900 sm:text-3xl md:text-[2.2rem] xl:text-[3.05rem]">
              {story.situation}
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

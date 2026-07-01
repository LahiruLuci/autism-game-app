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
          className="grid items-center gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6"
        >
          <div className="mx-auto flex h-[170px] w-full max-w-[220px] items-center justify-center rounded-[2rem] bg-gradient-to-br from-orange-50 via-amber-50 to-white px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_40px_rgba(251,146,60,0.08)] sm:h-[190px] md:mx-0 md:h-[210px] md:max-w-none">
            <span
              aria-hidden="true"
              className="text-[5.5rem] leading-none sm:text-[6rem] md:text-[6.5rem]"
            >
              {story.illustration}
            </span>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 text-center md:mx-0 md:items-start md:text-left">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-orange-500">
              Read the story
            </p>
            <h2 className="max-w-[18ch] text-balance text-2xl font-black leading-tight text-slate-900 sm:text-3xl md:text-[2.2rem]">
              {story.situation}
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

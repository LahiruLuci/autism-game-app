"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Story } from "@/types/games/emotion-story-choice";

type StoryCardProps = {
  story: Story;
};

export function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center gap-6"
        >
          {/* Row 2: Illustration Area - Compact but clear */}
          <div className="h-28 sm:h-32 flex items-center justify-center text-7xl sm:text-8xl">
            <motion.span
              key={story.illustration}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {story.illustration}
            </motion.span>
          </div>

          {/* Row 3: Story Text Content - Focused */}
          <div className="px-6 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {story.situation}
            </h2>
          </div>

          {/* Row 4: Question */}
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

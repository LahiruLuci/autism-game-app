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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -20 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-blue-900/5 overflow-hidden"
        >
          {/* Illustration Area */}
          <div className="h-48 sm:h-64 bg-gradient-to-br from-blue-50/50 to-violet-50/50 flex items-center justify-center text-8xl sm:text-9xl border-b border-slate-50">
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              {story.illustration}
            </motion.span>
          </div>
          
          {/* Text Content */}
          <div className="p-8 sm:p-12 text-center space-y-4">
            <p className="text-2xl sm:text-3xl font-display font-bold text-slate-800 leading-tight">
              "{story.situation}"
            </p>
            <div className="w-12 h-1 bg-blue-100 mx-auto rounded-full" />
            <p className="text-slate-500 font-medium">How does the child feel?</p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-blue-100/10 blur-3xl -z-10 rounded-full scale-110" />
    </div>
  );
}

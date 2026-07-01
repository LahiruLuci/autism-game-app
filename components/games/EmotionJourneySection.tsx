"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GameWithUnlockState } from "@/types/game";
import { getGameHref } from "@/lib/game-routes";

type EmotionJourneySectionProps = {
  childId: string;
  games: GameWithUnlockState[];
};

const LEVEL_THEMES = {
  1: {
    gradient: "from-pink-50 to-blue-50",
    border: "border-pink-100",
    accent: "text-pink-600",
    label: "Beginner",
    tagline: "Getting Started",
    illustration: "😊",
    duration: "3–5 minutes",
  },
  2: {
    gradient: "from-violet-50 to-blue-50",
    border: "border-violet-100",
    accent: "text-violet-600",
    label: "Growing",
    tagline: "Growing Confidence",
    illustration: "😮",
    duration: "5–7 minutes",
  },
  3: {
    gradient: "from-orange-50 to-violet-50",
    border: "border-orange-100",
    accent: "text-orange-600",
    label: "Confidence",
    tagline: "Advanced Practice",
    illustration: "😨",
    duration: "7–10 minutes",
  },
};

export function EmotionJourneySection({ childId, games }: EmotionJourneySectionProps) {
  // Sort games by level
  const sortedGames = [...games].sort((a, b) => a.level - b.level);

  return (
    <section className="py-20 space-y-12">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
          Emotion Learning Journey
        </h2>
        <p className="text-lg text-slate-500 leading-relaxed">
          Supportive activities designed to help children understand and express emotions gently. 
          Each step builds on the previous one at your own pace.
        </p>
      </div>

      <div className="relative space-y-8">
        {/* Connection Line (Desktop) */}
        <div className="absolute left-10 top-20 bottom-20 w-1 bg-gradient-to-b from-blue-100 via-violet-100 to-transparent hidden lg:block" />

        {sortedGames.map((game, index) => {
          const theme = LEVEL_THEMES[game.level as keyof typeof LEVEL_THEMES] || LEVEL_THEMES[1];
          const isUnlocked = game.is_unlocked;

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative lg:pl-24"
            >
              {/* Timeline Dot */}
              <div className={`absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-white shadow-sm z-10 hidden lg:block ${
                isUnlocked ? "bg-blue-400" : "bg-slate-200"
              }`} />

              <div className={`group rounded-[2.5rem] border bg-white/60 backdrop-blur-md p-8 sm:p-10 transition-all duration-500 ${
                isUnlocked 
                  ? `${theme.border} hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1` 
                  : "border-slate-100 opacity-70"
              }`}>
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  
                  {/* Illustration Area */}
                  <div className={`w-48 h-48 rounded-[3rem] bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-7xl shadow-inner`}>
                    <motion.span
                      animate={isUnlocked ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {theme.illustration}
                    </motion.span>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 text-center md:text-left space-y-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <span className={`px-4 py-1 rounded-full bg-white text-[10px] font-bold uppercase tracking-widest border ${theme.border} ${theme.accent}`}>
                          Level {game.level} — {theme.label}
                        </span>
                        <span className="px-4 py-1 rounded-full bg-white/50 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-100">
                          {theme.duration}
                        </span>
                      </div>
                      <h3 className="font-display text-3xl font-bold text-slate-900">
                        {theme.tagline}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                        {game.description || `Guided activities focused on foundational emotional recognition in a calm, safe environment.`}
                      </p>
                    </div>

                    <div className="pt-2">
                      {isUnlocked ? (
                        <Link
                          href={getGameHref(childId, game.game_slug, game.level)}
                          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-extrabold shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                          Start Activity
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-slate-100 text-slate-400 text-sm font-bold border border-slate-200">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Locked for now
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

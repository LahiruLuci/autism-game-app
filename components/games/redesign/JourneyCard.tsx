"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Lock, Clock, Sparkles } from "lucide-react";
import type { GameWithUnlockState } from "@/types/game";

interface JourneyCardProps {
  childId: string;
  game: GameWithUnlockState;
}

export function JourneyCard({ childId, game }: JourneyCardProps) {
  const isUnlocked = game.is_unlocked;
  
  const themes = {
    emotion: "from-rose-50 to-orange-50 text-rose-600 border-rose-100 ring-rose-200/20",
    cognitive: "from-blue-50 to-indigo-50 text-blue-600 border-blue-100 ring-blue-200/20",
    self_awareness: "from-amber-50 to-yellow-50 text-amber-600 border-amber-100 ring-amber-200/20",
    mathematical: "from-emerald-50 to-teal-50 text-emerald-600 border-emerald-100 ring-emerald-200/20",
  };

  const areaTheme = themes[game.area as keyof typeof themes] || themes.emotion;
  
  const levelIcons = ["🌱", "🌤", "🌈"];
  const levelLabels = ["Beginner", "Growing", "Challenge"];
  const levelIcon = levelIcons[game.level - 1] || "✨";
  const levelLabel = levelLabels[game.level - 1] || `Level ${game.level}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={isUnlocked ? { y: -5 } : {}}
      className="group relative h-full"
    >
      <div className={`
        h-full relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-6 flex flex-col transition-all duration-500
        ${isUnlocked ? 'shadow-premium hover:shadow-2xl ring-1 ring-slate-100' : 'opacity-60 grayscale-[0.5]'}
      `}>
        {/* Progress Background Overlay (Optional) */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${areaTheme} blur-3xl opacity-30 -mr-16 -mt-16`} />

        {/* Content Top */}
        <div className="flex-1 space-y-6">
          <div className="flex items-start justify-between">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${areaTheme} flex items-center justify-center text-3xl shadow-inner`}>
              {levelIcon}
            </div>
            <div className="flex flex-col items-end text-right">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${areaTheme}`}>
                Level {game.level}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {levelLabel}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {game.game_name}
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
              {game.description || "A calm learning activity."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <Clock size={12} />
            <span>3-5m</span>
          </div>

          {isUnlocked ? (
            <Link
              href={`/games/${childId}/${game.game_slug}?level=${game.level}`}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
            >
              <Play size={10} fill="currentColor" />
              Start
            </Link>
          ) : (
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 text-slate-400 text-[11px] font-black uppercase tracking-widest">
              <Lock size={10} />
              Locked
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import type { GameWithUnlockState } from "@/types/game";
import { JourneyCard } from "./JourneyCard";
import { Sparkles, Brain, Heart, Calculator } from "lucide-react";

interface JourneyTimelineProps {
  childId: string;
  games: GameWithUnlockState[];
}

const AREA_METADATA = {
  emotion: {
    label: "Emotion Skills",
    icon: <Heart size={20} className="text-rose-500" />,
    description: "Learn to recognize and express feelings gently.",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  cognitive: {
    label: "Cognitive Skills",
    icon: <Brain size={20} className="text-blue-500" />,
    description: "Develop memory, attention, and problem-solving.",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  self_awareness: {
    label: "Self-Awareness",
    icon: <Sparkles size={20} className="text-amber-500" />,
    description: "Understand personal needs and daily routines.",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  mathematical: {
    label: "Mathematical Skills",
    icon: <Calculator size={20} className="text-emerald-500" />,
    description: "Explore numbers and patterns through play.",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
};

export function JourneyTimeline({ childId, games }: JourneyTimelineProps) {
  // Group games by area
  const gamesByArea = games.reduce((acc, game) => {
    if (!acc[game.area]) acc[game.area] = [];
    acc[game.area].push(game);
    return acc;
  }, {} as Record<string, GameWithUnlockState[]>);

  // Define the order of areas
  const areaOrder = ["emotion", "cognitive", "self_awareness", "mathematical"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
      {areaOrder.map((areaKey) => {
        const areaGames = gamesByArea[areaKey] || [];
        if (areaGames.length === 0) return null;

        const metadata = AREA_METADATA[areaKey as keyof typeof AREA_METADATA];
        
        // Sort games by level within each area
        const sortedGames = [...areaGames].sort((a, b) => a.level - b.level);

        return (
          <section key={areaKey} className="space-y-10">
            {/* Area Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
              <div className="space-y-4 max-w-xl">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${metadata.bg} ${metadata.border} border`}>
                  {metadata.icon}
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                    {metadata.label}
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                  Learning Step: {metadata.label}
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {metadata.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold bg-slate-50 px-4 py-2 rounded-2xl">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                {sortedGames.length} Activities Available
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {sortedGames.map((game) => (
                <JourneyCard
                  key={game.id}
                  childId={childId}
                  game={game}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Finishing Touch */}
      <div className="pt-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-[2rem] bg-slate-900 text-white shadow-2xl shadow-slate-200"
        >
          <Sparkles size={20} className="text-yellow-400" />
          <span className="text-sm font-black uppercase tracking-widest">More steps coming soon</span>
        </motion.div>
      </div>
    </div>
  );
}

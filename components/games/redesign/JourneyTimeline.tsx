"use client";

import { motion } from "framer-motion";
import type { GameWithUnlockState } from "@/types/game";
import { JourneyCard } from "./JourneyCard";
import { Brain, Heart, Calculator, Compass } from "lucide-react";
import { MascotGuide } from "@/components/ui/MascotGuide";

interface JourneyTimelineProps {
  childId: string;
  games: GameWithUnlockState[];
}

const AREA_METADATA = {
  emotion: {
    label: "Feeling Skills",
    icon: <Heart size={20} className="text-rose-400" />,
    description: "Learn about feelings and friends.",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  cognitive: {
    label: "Thinking Skills",
    icon: <Brain size={20} className="text-blue-400" />,
    description: "Fun puzzles for your brain.",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  self_awareness: {
    label: "Me & My Day",
    icon: <Compass size={20} className="text-amber-400" />,
    description: "All about you and your day.",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  mathematical: {
    label: "Number Skills",
    icon: <Calculator size={20} className="text-emerald-400" />,
    description: "Count and find shapes.",
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

  const areaOrder = ["emotion", "cognitive", "self_awareness", "mathematical"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-32">
      {/* Reusable Mascot Welcome - Simplified */}
      <MascotGuide
        message="Hi friend! Let's pick a fun game."
        className="mb-8"
      />

      {areaOrder.map((areaKey) => {
        const areaGames = gamesByArea[areaKey] || [];
        if (areaGames.length === 0) return null;

        const metadata = AREA_METADATA[areaKey as keyof typeof AREA_METADATA];
        const sortedGames = [...areaGames].sort((a, b) => a.level - b.level);
        const firstUnlockedIndex = sortedGames.findIndex(g => g.is_unlocked);

        // Group by game_slug (Activity Type)
        const gamesByType = sortedGames.reduce((acc, game) => {
          if (!acc[game.game_slug]) acc[game.game_slug] = [];
          acc[game.game_slug].push(game);
          return acc;
        }, {} as Record<string, GameWithUnlockState[]>);

        return (
          <section key={areaKey} className="space-y-20">
            {/* Soft Category Header */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full ${metadata.bg} ${metadata.border} border shadow-sm`}>
                {metadata.icon}
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  {metadata.label}
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {metadata.label}
              </h2>
              <p className="text-lg text-slate-400 font-bold max-w-lg mx-auto">
                {metadata.description}
              </p>
            </div>

            {/* Sub-grouped Tracks */}
            <div className="space-y-40">
              {Object.entries(gamesByType).map(([slug, typeGames]) => {
                const gameName = typeGames[0].game_name.split("Level")[0].trim();

                return (
                  <div key={slug} className="space-y-16">
                    {/* Minimal Track Divider */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-1.5 w-16 bg-slate-100 rounded-full" />
                      <h3 className="text-xl font-black text-slate-700/80 uppercase tracking-[0.4em] text-center">
                        {gameName}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 max-w-7xl mx-auto">
                      {typeGames.map((game) => {
                        const globalIdx = sortedGames.indexOf(game);
                        return (
                          <JourneyCard
                            key={game.id}
                            childId={childId}
                            game={game}
                            isFirstUnlocked={globalIdx === firstUnlockedIndex}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Warm Footer */}
      <div className="pt-20 text-center pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex flex-col items-center gap-6 p-12 rounded-[4rem] bg-indigo-50/50 border-4 border-white border-dashed"
        >
          <div className="text-6xl">🎈</div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-900">You're doing great!</h3>
            <p className="text-slate-400 font-bold max-w-md mx-auto">
              You played so many games today. Ready for one more?
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

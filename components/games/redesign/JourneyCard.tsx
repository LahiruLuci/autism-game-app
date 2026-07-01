"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play, Lock, Sparkles } from "lucide-react";
import type { GameWithUnlockState } from "@/types/game";
import { getGameHref } from "@/lib/game-routes";

interface JourneyCardProps {
  childId: string;
  game: GameWithUnlockState;
  isFirstUnlocked?: boolean;
}

const GAME_ASSETS: Record<string, { image: string; label: string; desc: string; mascotState: "normal" | "correct" | "incorrect" }> = {
  "emotion-face-match": { image: "/images/games/emotion-face-match.png", label: "Face Match", desc: "Pick the feeling", mascotState: "normal" },
  "count-the-objects": { image: "/images/games/count-the-objects.png", label: "Counting", desc: "Count together", mascotState: "normal" },
  "daily-routine-order": { image: "/images/games/daily-routine.png", label: "My Day", desc: "Plan your day", mascotState: "normal" },
  "emotion-reflection-board": { image: "/images/games/emotion-story.png", label: "Feelings", desc: "Check your mood", mascotState: "normal" },
  "emotion-story-choice": { image: "/images/games/emotion-story.png", label: "Stories", desc: "Choose the story", mascotState: "normal" },
  "memory-match": { image: "/images/games/memory-match.png", label: "Memory", desc: "Match the cards", mascotState: "normal" },
  "pattern-builder": { image: "/images/games/pattern-builder.png", label: "Patterns", desc: "Build a path", mascotState: "normal" },
  "personal-choice-adventure": { image: "/images/games/personal-choice.png", label: "Adventure", desc: "You decide", mascotState: "normal" },
  "shape-number-match": { image: "/images/games/shapes-&-number-match.png", label: "Shapes", desc: "Find the shapes", mascotState: "normal" },
};

export function JourneyCard({ childId, game, isFirstUnlocked }: JourneyCardProps) {
  const isUnlocked = game.is_unlocked;
  const assets = GAME_ASSETS[game.game_slug] || {
    image: "/images/games/emotion-face-match.png",
    label: game.game_name,
    desc: "Let's play",
    mascotState: "normal"
  };

  const themes = {
    emotion: {
      bg: "bg-[#FFF0F3]",
      button: "bg-[#FF4D6D] hover:bg-[#FF002E]",
      text: "text-[#C9184A]",
      border: "border-[#FFB3C1]/30",
      accent: "bg-[#FFB3C1]",
      mascot: "/mascot/mascot-normal.png"
    },
    cognitive: {
      bg: "bg-[#E0F2FE]",
      button: "bg-[#0EA5E9] hover:bg-[#0284C7]",
      text: "text-[#0369A1]",
      border: "border-[#BAE6FD]/30",
      accent: "bg-[#BAE6FD]",
      mascot: "/mascot/mascot-happy.png"
    },
    self_awareness: {
      bg: "bg-[#FEFCE8]",
      button: "bg-[#EAB308] hover:bg-[#CA8A04]",
      text: "text-[#A16207]",
      border: "border-[#FEF08A]/30",
      accent: "bg-[#FEF08A]",
      mascot: "/mascot/mascot-normal.png"
    },
    mathematical: {
      bg: "bg-[#F0FDF4]",
      button: "bg-[#22C55E] hover:bg-[#16A34A]",
      text: "text-[#15803D]",
      border: "border-[#BBF7D0]/30",
      accent: "bg-[#BBF7D0]",
      mascot: "/mascot/mascot-normal.png"
    },
  };

  const theme = themes[game.area as keyof typeof themes] || themes.emotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      className="relative w-full"
    >
      {/* "Ready to Play" Callout - Simplified, No excess sparkles */}
      {isFirstUnlocked && (
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-full bg-white shadow-md border border-slate-100 flex items-center gap-2"
        >
          <Sparkles size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Ready!</span>
        </motion.div>
      )}

      <div className={`
        relative overflow-hidden rounded-[3rem] border-4 transition-all duration-500
        ${isUnlocked
          ? `${theme.bg} ${theme.border} shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)]`
          : 'bg-slate-50 border-slate-100 opacity-80'}
      `}>
        <div className={`absolute left-5 top-5 z-20 rounded-full bg-white/85 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] shadow-sm ${isUnlocked ? theme.text : "text-slate-400"}`}>
          Level {game.level}
        </div>

        {/* Top Mascot Peek - Storytelling style */}
        <div className="absolute top-4 right-4 w-16 h-16 opacity-40">
          <Image
            src={theme.mascot}
            alt="Mascot"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center p-8 space-y-6">

          {/* Main Illustration Area - Large for visibility */}
          <div className="relative w-full aspect-square max-w-[200px] flex items-center justify-center">
            <div className={`absolute inset-0 rounded-full ${theme.accent} opacity-20 blur-2xl`} />
            <div className="relative w-full h-full rounded-full bg-white shadow-sm border-8 border-white overflow-hidden p-4">
              <Image
                src={assets.image}
                alt={assets.label}
                fill
                className={`object-contain transition-all duration-700 ${!isUnlocked ? "grayscale opacity-40" : ""}`}
                priority
              />
            </div>
          </div>

          {/* Minimal, Predictable Text */}
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              {assets.label}
            </h3>
            <p className="text-base font-bold text-slate-500">
              {assets.desc}
            </p>
          </div>

          {/* Action Area - Clean Pastel Button */}
          <div className="w-full pt-2">
            {isUnlocked ? (
              <Link
                href={getGameHref(childId, game.game_slug, game.level)}
                className={`
                  w-full py-5 rounded-2xl ${theme.button} text-white text-sm font-black uppercase tracking-widest
                  flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-black/5
                `}
              >
                <Play size={16} fill="currentColor" />
                Let's Play
              </Link>
            ) : (
              <div className="w-full py-5 rounded-2xl bg-white/60 text-slate-500 text-sm sm:text-base font-black leading-tight px-4 text-center border border-white/50 backdrop-blur-sm shadow-sm">
                Finish this game to unlock 🌈
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

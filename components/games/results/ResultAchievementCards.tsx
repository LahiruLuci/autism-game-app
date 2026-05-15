"use client";

import { motion } from "framer-motion";

type ResultAchievementCardsProps = {
  session: any;
};

export function ResultAchievementCards({ session }: ResultAchievementCardsProps) {
  const achievements = [
    {
      label: "Feelings Found",
      value: session.correct_answers,
      icon: "💛",
      gradient: "from-amber-50 to-orange-50",
      border: "border-amber-100",
      text: "text-amber-700",
    },
    {
      label: "Focus Progress",
      value: `${Math.min(100, Math.round((session.correct_answers / Math.max(session.attempts, session.correct_answers, 1)) * 100))}%`,
      icon: "🌈",
      gradient: "from-blue-50 to-violet-50",
      border: "border-blue-100",
      text: "text-blue-700",
    },
    {
      label: "Practice Time",
      value: `${session.time_taken || 1}s`,
      icon: "⏰",
      gradient: "from-violet-50 to-pink-50",
      border: "border-violet-100",
      text: "text-violet-700",
    },
    {
      label: "Careful Matching",
      value: session.attempts,
      icon: "✨",
      gradient: "from-green-50 to-blue-50",
      border: "border-green-100",
      text: "text-green-700",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 sm:gap-6">
      {achievements.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className={`p-6 rounded-[2.5rem] bg-gradient-to-br ${card.gradient} border ${card.border} shadow-sm space-y-2`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl">{card.icon}</span>
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-slate-400">
              {card.label}
            </span>
          </div>
          <p className={`font-display text-3xl font-bold ${card.text}`}>
            {card.value}
          </p>
        </motion.div>
      ))}
    </section>
  );
}

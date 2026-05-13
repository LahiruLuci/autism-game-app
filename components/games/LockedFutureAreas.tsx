"use client";

import { motion } from "framer-motion";

export function LockedFutureAreas() {
  const futureAreas = [
    { name: "Cognitive Skills", icon: "🧠" },
    { name: "Self-awareness", icon: "🌟" },
    { name: "Mathematical Skills", icon: "🔢" },
  ];

  return (
    <section className="py-20 border-t border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40 grayscale pointer-events-none">
        {futureAreas.map((area, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-sm border border-slate-100 rounded-[2.5rem] p-10 text-center space-y-4">
            <div className="text-5xl">{area.icon}</div>
            <div>
              <h3 className="font-display text-xl font-bold text-slate-800">{area.name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Coming Soon</p>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              Available after future activity updates.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

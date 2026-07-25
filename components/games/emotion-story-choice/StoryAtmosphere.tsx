"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Story } from "@/types/games/emotion-story-choice";

type AtmosphereKey = "park" | "birthday" | "rain" | "food" | "school" | "home" | "animal" | "celebration";

type AtmosphereConfig = {
  page: string;
  glowA: string;
  glowB: string;
  glowC: string;
  ground: string;
  accent: string;
  dot: string;
  symbols: string[];
};

const ATMOSPHERES: Record<AtmosphereKey, AtmosphereConfig> = {
  park: {
    page: "linear-gradient(135deg, #fff8ed 0%, #effbea 42%, #eef8ff 100%)",
    glowA: "rgba(134, 239, 172, 0.18)",
    glowB: "rgba(253, 224, 71, 0.14)",
    glowC: "rgba(56, 189, 248, 0.10)",
    ground: "linear-gradient(90deg, rgba(187,247,208,0.18), rgba(254,249,195,0.12), rgba(186,230,253,0.10))",
    accent: "rgba(34, 197, 94, 0.12)",
    dot: "rgba(250, 204, 21, 0.22)",
    symbols: ["leaf", "flower", "hill", "cloud"],
  },
  birthday: {
    page: "linear-gradient(135deg, #fff7ed 0%, #fff1f7 48%, #f1f7ff 100%)",
    glowA: "rgba(251, 146, 60, 0.16)",
    glowB: "rgba(244, 114, 182, 0.14)",
    glowC: "rgba(96, 165, 250, 0.10)",
    ground: "linear-gradient(90deg, rgba(253,186,116,0.14), rgba(244,114,182,0.11), rgba(147,197,253,0.10))",
    accent: "rgba(251, 146, 60, 0.12)",
    dot: "rgba(244, 114, 182, 0.22)",
    symbols: ["balloon", "ribbon", "confetti", "spark"],
  },
  rain: {
    page: "linear-gradient(135deg, #f8fbff 0%, #eaf5ff 48%, #f4f7ff 100%)",
    glowA: "rgba(96, 165, 250, 0.15)",
    glowB: "rgba(125, 211, 252, 0.12)",
    glowC: "rgba(167, 139, 250, 0.10)",
    ground: "linear-gradient(90deg, rgba(191,219,254,0.14), rgba(186,230,253,0.12), rgba(221,214,254,0.10))",
    accent: "rgba(59, 130, 246, 0.10)",
    dot: "rgba(96, 165, 250, 0.20)",
    symbols: ["cloud", "drop", "rainbow", "drop"],
  },
  food: {
    page: "linear-gradient(135deg, #fff8ed 0%, #fffaf0 50%, #f8fbff 100%)",
    glowA: "rgba(245, 158, 11, 0.14)",
    glowB: "rgba(251, 191, 36, 0.12)",
    glowC: "rgba(248, 113, 113, 0.08)",
    ground: "linear-gradient(90deg, rgba(180,83,9,0.06), rgba(251,191,36,0.10), rgba(254,243,199,0.14))",
    accent: "rgba(217, 119, 6, 0.10)",
    dot: "rgba(180, 83, 9, 0.16)",
    symbols: ["crumb", "steam", "circle", "crumb"],
  },
  school: {
    page: "linear-gradient(135deg, #f8fbff 0%, #f7f4ff 48%, #fffaf0 100%)",
    glowA: "rgba(96, 165, 250, 0.13)",
    glowB: "rgba(168, 85, 247, 0.10)",
    glowC: "rgba(251, 191, 36, 0.10)",
    ground: "linear-gradient(90deg, rgba(147,197,253,0.12), rgba(221,214,254,0.12), rgba(253,230,138,0.10))",
    accent: "rgba(37, 99, 235, 0.10)",
    dot: "rgba(251, 191, 36, 0.20)",
    symbols: ["pencil", "book", "dot", "pencil"],
  },
  home: {
    page: "linear-gradient(135deg, #fff8f1 0%, #f9fbff 48%, #f0fdf4 100%)",
    glowA: "rgba(251, 146, 60, 0.12)",
    glowB: "rgba(45, 212, 191, 0.10)",
    glowC: "rgba(251, 207, 232, 0.11)",
    ground: "linear-gradient(90deg, rgba(251,146,60,0.10), rgba(20,184,166,0.09), rgba(244,114,182,0.08))",
    accent: "rgba(20, 184, 166, 0.10)",
    dot: "rgba(251, 146, 60, 0.18)",
    symbols: ["window", "plant", "circle", "cloud"],
  },
  animal: {
    page: "linear-gradient(135deg, #fff9ed 0%, #effbea 48%, #eef8ff 100%)",
    glowA: "rgba(74, 222, 128, 0.16)",
    glowB: "rgba(251, 191, 36, 0.11)",
    glowC: "rgba(125, 211, 252, 0.10)",
    ground: "linear-gradient(90deg, rgba(134,239,172,0.16), rgba(253,230,138,0.11), rgba(186,230,253,0.08))",
    accent: "rgba(22, 163, 74, 0.10)",
    dot: "rgba(34, 197, 94, 0.18)",
    symbols: ["leaf", "butterfly", "grass", "cloud"],
  },
  celebration: {
    page: "linear-gradient(135deg, #fff7ed 0%, #fef3ff 45%, #eff6ff 100%)",
    glowA: "rgba(244, 114, 182, 0.14)",
    glowB: "rgba(251, 191, 36, 0.12)",
    glowC: "rgba(96, 165, 250, 0.10)",
    ground: "linear-gradient(90deg, rgba(244,114,182,0.12), rgba(251,191,36,0.10), rgba(96,165,250,0.10))",
    accent: "rgba(244, 114, 182, 0.10)",
    dot: "rgba(251, 191, 36, 0.22)",
    symbols: ["spark", "confetti", "ribbon", "balloon"],
  },
};

function getAtmosphereKey(story: Story): AtmosphereKey {
  const text = `${story.id} ${story.situation}`.toLowerCase();

  if (text.includes("birthday") || text.includes("gift") || text.includes("balloon") || text.includes("party")) return "birthday";
  if (text.includes("rain") || text.includes("thunder") || text.includes("storm") || text.includes("alarm") || text.includes("loud")) return "rain";
  if (text.includes("cookie") || text.includes("ice cream") || text.includes("table")) return "food";
  if (text.includes("school") || text.includes("classroom") || text.includes("drawing") || text.includes("puzzle")) return "school";
  if (text.includes("family") || text.includes("room") || text.includes("favorite toy")) return "home";
  if (text.includes("zoo") || text.includes("dog") || text.includes("animal")) return "animal";
  if (text.includes("park")) return "park";
  if (text.includes("surprise")) return "celebration";

  return "home";
}

function Decoration({ type, index, config }: { type: string; index: number; config: AtmosphereConfig }) {
  const positions = [
    "left-[8%] top-[18%]",
    "right-[9%] top-[22%]",
    "left-[16%] bottom-[16%]",
    "right-[18%] bottom-[20%]",
  ];

  const base = `absolute ${positions[index % positions.length]} opacity-[0.13]`;
  const delay = index * 1.7;

  return (
    <motion.div
      className={base}
      animate={{ y: [0, -14, 0], x: [0, index % 2 === 0 ? 8 : -8, 0] }}
      transition={{ duration: 18 + index * 3, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      {type === "cloud" && <div className="h-12 w-28 rounded-full bg-white blur-[1px] before:absolute before:-top-5 before:left-5 before:h-12 before:w-12 before:rounded-full before:bg-white after:absolute after:-top-7 after:right-7 after:h-16 after:w-16 after:rounded-full after:bg-white" />}
      {type === "leaf" && <div className="h-20 w-10 rounded-[100%_0_100%_0] bg-emerald-300" />}
      {type === "flower" && <div className="relative size-12 rounded-full bg-pink-200 before:absolute before:-left-4 before:top-3 before:size-6 before:rounded-full before:bg-yellow-200 after:absolute after:-right-4 after:top-3 after:size-6 after:rounded-full after:bg-yellow-200" />}
      {type === "hill" && <div className="h-24 w-52 rounded-t-full" style={{ background: config.ground }} />}
      {type === "balloon" && <div className="h-20 w-14 rounded-full bg-pink-300 shadow-[36px_12px_0_rgba(96,165,250,0.55),-30px_18px_0_rgba(251,191,36,0.55)]" />}
      {type === "ribbon" && <div className="h-3 w-36 rounded-full bg-rose-300 shadow-[0_18px_0_rgba(251,191,36,0.55),0_36px_0_rgba(96,165,250,0.45)]" />}
      {type === "confetti" && <div className="size-4 rounded-full bg-pink-300 shadow-[26px_12px_0_rgba(251,191,36,0.7),-18px_28px_0_rgba(96,165,250,0.6),44px_38px_0_rgba(52,211,153,0.55)]" />}
      {type === "spark" && <div className="size-14 rounded-full bg-yellow-200 blur-sm" />}
      {type === "drop" && <div className="h-12 w-5 rounded-b-full rounded-t-[80%] bg-sky-300" />}
      {type === "rainbow" && <div className="h-20 w-40 rounded-t-full border-t-[14px] border-sky-300 shadow-[0_-12px_0_rgba(244,114,182,0.45),0_-24px_0_rgba(251,191,36,0.38)]" />}
      {type === "crumb" && <div className="size-3 rounded-full bg-amber-600 shadow-[18px_10px_0_rgba(180,83,9,0.7),-16px_18px_0_rgba(245,158,11,0.6),35px_28px_0_rgba(251,191,36,0.5)]" />}
      {type === "steam" && <div className="h-24 w-3 rounded-full bg-orange-200 blur-[2px] shadow-[22px_10px_0_rgba(251,191,36,0.45),44px_-8px_0_rgba(251,146,60,0.35)]" />}
      {type === "circle" && <div className="size-16 rounded-full" style={{ background: config.dot }} />}
      {type === "pencil" && <div className="h-4 w-36 rounded-full bg-yellow-300 shadow-[18px_18px_0_rgba(96,165,250,0.45)]" />}
      {type === "book" && <div className="h-16 w-24 rounded-lg bg-blue-300 shadow-[18px_12px_0_rgba(168,85,247,0.42)]" />}
      {type === "window" && <div className="grid size-24 grid-cols-2 gap-1 rounded-2xl bg-sky-200 p-2" style={{ boxShadow: "0 0 0 10px rgba(255,255,255,0.55)" }}><span className="rounded bg-white/50" /><span className="rounded bg-white/50" /><span className="rounded bg-white/50" /><span className="rounded bg-white/50" /></div>}
      {type === "plant" && <div className="h-20 w-10 rounded-t-full bg-emerald-300 shadow-[24px_8px_0_rgba(52,211,153,0.6),-20px_16px_0_rgba(34,197,94,0.45)]" />}
      {type === "butterfly" && <div className="size-10 rounded-full bg-pink-200 shadow-[18px_0_0_rgba(96,165,250,0.45),9px_16px_0_rgba(251,191,36,0.45)]" />}
      {type === "grass" && <div className="h-16 w-32 rounded-t-full bg-emerald-300" />}
      {type === "dot" && <div className="size-5 rounded-full" style={{ background: config.dot }} />}
    </motion.div>
  );
}

export function StoryAtmosphere({ story }: { story: Story }) {
  const config = ATMOSPHERES[getAtmosphereKey(story)];
  const style = {
    "--story-page": config.page,
    "--story-glow-a": config.glowA,
    "--story-glow-b": config.glowB,
    "--story-glow-c": config.glowC,
    "--story-ground": config.ground,
    "--story-accent": config.accent,
    "--story-dot": config.dot,
  } as CSSProperties;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={style} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "var(--story-page)" }} />
      <motion.div
        className="absolute -left-28 top-10 h-80 w-80 rounded-full blur-[36px]"
        style={{ background: "var(--story-glow-a)", opacity: 0.75 }}
        animate={{ x: [0, 28, 0], y: [0, 18, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-6rem] top-20 h-96 w-96 rounded-full blur-[40px]"
        style={{ background: "var(--story-glow-b)", opacity: 0.68 }}
        animate={{ x: [0, -22, 0], y: [0, 24, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10rem] left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-[50%] blur-[34px]"
        style={{ background: "var(--story-ground)", opacity: 0.82 }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.62),transparent_22%),radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.45),transparent_20%)]" />
      {config.symbols.map((symbol, index) => (
        <Decoration key={`${symbol}-${index}`} type={symbol} index={index} config={config} />
      ))}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
    </div>
  );
}
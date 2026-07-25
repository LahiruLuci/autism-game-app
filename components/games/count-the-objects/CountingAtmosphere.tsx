"use client";

import { motion } from "framer-motion";

export function CountingAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(165,243,252,0.45),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(191,219,254,0.48),transparent_32%),radial-gradient(circle_at_52%_88%,rgba(221,214,254,0.34),transparent_34%),linear-gradient(135deg,#f0fdff_0%,#f6fbff_46%,#f7f5ff_100%)]" />

      <motion.div
        className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-200/35 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, 18, 0], opacity: [0.4, 0.62, 0.4] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-4rem] top-28 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 24, 0], opacity: [0.35, 0.56, 0.35] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-100/50 blur-3xl"
        animate={{ scale: [1, 1.07, 1], opacity: [0.45, 0.67, 0.45] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg className="absolute inset-x-0 bottom-0 h-64 w-full opacity-50" viewBox="0 0 1440 260" fill="none" preserveAspectRatio="none">
        <path d="M0 178C176 112 340 118 510 168C674 216 834 222 1004 172C1178 122 1306 118 1440 158V260H0V178Z" fill="url(#countGround)" />
        <defs>
          <linearGradient id="countGround" x1="0" x2="1440" y1="122" y2="232" gradientUnits="userSpaceOnUse">
            <stop stopColor="#CFFAFE" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="#DBEAFE" stopOpacity="0.36" />
            <stop offset="1" stopColor="#EDE9FE" stopOpacity="0.42" />
          </linearGradient>
        </defs>
      </svg>

      {["1", "2", "3", "4"].map((number, index) => (
        <motion.span
          key={number}
          className="absolute flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/45 text-sm font-black text-cyan-400/60 shadow-[0_0_28px_rgba(34,211,238,0.18)] backdrop-blur-sm"
          style={{ left: `${14 + index * 22}%`, top: index % 2 === 0 ? "34%" : "74%" }}
          animate={{ y: [0, -12, 0], opacity: [0.28, 0.64, 0.28] }}
          transition={{ duration: 9 + index, delay: index * 0.7, repeat: Infinity, ease: "easeInOut" }}
        >
          {number}
        </motion.span>
      ))}
    </div>
  );
}

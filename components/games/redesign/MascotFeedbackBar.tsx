"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type FeedbackType = "correct" | "incorrect" | null;

interface MascotFeedbackBarProps {
    feedbackType: FeedbackType;
}

const CONFIG = {
    correct: {
        image: "/mascot/mascot-happy.png",
        message: "Great job! You got it right! 🌟",
        bg: "bg-green-50/80",
        border: "border-green-200",
        text: "text-green-700",
        glow: "bg-green-200/40",
    },
    incorrect: {
        image: "/mascot/mascot-supportive.png",
        message: "Good try! Let's try again together. 💛",
        bg: "bg-amber-50/80",
        border: "border-amber-200",
        text: "text-amber-700",
        glow: "bg-amber-100/40",
    },
    normal: {
        image: "/mascot/mascot-normal.png",
        message: "Choose the answer you think is correct.",
        bg: "bg-blue-50/50",
        border: "border-blue-100",
        text: "text-blue-700",
        glow: "bg-blue-100/20",
    },
};

export function MascotFeedbackBar({ feedbackType }: MascotFeedbackBarProps) {
    const key = feedbackType ?? "normal";
    const cfg = CONFIG[key];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={key}
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`
          w-full max-w-xl mx-auto flex items-center gap-5 px-5 py-4
          rounded-[2.5rem] border-2 backdrop-blur-xl shadow-lg
          ${cfg.bg} ${cfg.border}
        `}
            >
                {/* Mascot image */}
                <div className="relative flex-shrink-0">
                    <motion.div
                        key={key + "-img"}
                        animate={key === "correct" ? { rotate: [0, 10, -10, 0] } : { y: [0, -4, 0] }}
                        transition={key === "correct"
                            ? { duration: 0.5, repeat: 1 }
                            : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                        }
                        className="w-16 h-16 relative"
                    >
                        <Image
                            src={cfg.image}
                            alt="Lumi Mascot"
                            width={128}
                            height={128}
                            className="w-full h-full object-contain"
                            priority
                        />
                        {/* glow ring */}
                        <div className={`absolute inset-0 -z-10 rounded-full blur-xl ${cfg.glow}`} />
                    </motion.div>
                </div>

                {/* Message */}
                <p className={`font-bold text-sm sm:text-base leading-snug ${cfg.text}`}>
                    {cfg.message}
                </p>
            </motion.div>
        </AnimatePresence>
    );
}

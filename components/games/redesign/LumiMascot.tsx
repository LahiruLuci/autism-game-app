"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type LumiMascotProps = {
    mode?: "idle" | "happy" | "talking" | "cheering" | "supportive";
    state?: "normal" | "correct" | "incorrect";
    message?: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
};

export function LumiMascot({ mode, state = "normal", message, size = "md", className = "" }: LumiMascotProps) {
    const sizes = {
        sm: "w-24 h-24",
        md: "w-40 h-40",
        lg: "w-56 h-56",
        xl: "w-72 h-72",
    };

    const currentImage = state === "correct"
        ? "/mascot/mascot-happy.png"
        : state === "incorrect"
            ? "/mascot/mascot-supportive.png"
            : "/mascot/mascot-normal.png";

    const effectiveMode = mode || (state === "correct" ? "happy" : state === "incorrect" ? "supportive" : "idle");

    return (
        <div className={`relative flex flex-col items-center select-none ${className}`}>
            <motion.div
                key={state}
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut"
                }}
                className={`${sizes[size]} relative z-10`}
            >
                <Image
                    src={currentImage}
                    alt="Lumi Mascot"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                    priority
                />

                {/* Subdued shadow - no aggressive glow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-4 bg-slate-900/5 blur-xl rounded-full -z-10" />
            </motion.div>

            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 5 }}
                        className="mt-6 relative"
                    >
                        {/* Soft, Predictable Speech Bubble */}
                        <div className="bg-white border-4 border-slate-100 px-8 py-4 rounded-[2.5rem] shadow-sm max-w-[300px]">
                            <p className="text-slate-800 font-black text-base leading-snug text-center">
                                {message}
                            </p>

                            {/* Triangle Pointing Down */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-l-4 border-t-4 border-slate-100 rotate-45 rounded-sm" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

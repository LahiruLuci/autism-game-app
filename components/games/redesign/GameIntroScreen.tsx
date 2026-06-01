"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CalmBackground } from "@/components/ui/CalmBackground";

interface introChip {
    icon: string;
    text: string;
}

interface GameIntroScreenProps {
    title: string;
    description: string;
    level: number;
    levelLabel: string;
    mascotImage: string;
    buttonText: string;
    onStart: () => void;
    onBack: () => void;
    accentColor?: string;
    chips?: introChip[];
}

export function GameIntroScreen({
    title,
    description,
    level,
    levelLabel,
    mascotImage,
    buttonText,
    onStart,
    onBack,
    accentColor = "blue",
    chips = []
}: GameIntroScreenProps) {

    const colorStyles = {
        orange: {
            bg: "bg-orange-50",
            text: "text-orange-600",
            border: "border-orange-100",
            button: "bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-200",
        },
        blue: {
            bg: "bg-blue-50",
            text: "text-blue-600",
            border: "border-blue-100",
            button: "bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-200",
        },
        rose: {
            bg: "bg-rose-50",
            text: "text-rose-600",
            border: "border-rose-100",
            button: "bg-gradient-to-r from-rose-500 to-rose-600 shadow-rose-200",
        }
    };

    const style = colorStyles[accentColor as keyof typeof colorStyles] || colorStyles.blue;

    return (
        <main className="h-screen relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <CalmBackground />

            {/* Background decorative blobs */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-50/40 rounded-full blur-3xl -z-0" />

            <div className="max-w-xl w-full flex flex-col items-center gap-4 sm:gap-6 relative z-10">
                {/* Large Mascot Illustration - Scaled Down for Viewport */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                    }}
                    className="relative w-40 h-40 sm:w-56 sm:h-56"
                >
                    <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
                    <Image
                        src={mascotImage}
                        alt="Game Mascot"
                        fill
                        className="object-contain drop-shadow-lg"
                        priority
                    />
                </motion.div>

                {/* Content Card - Compact for Viewport */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full bg-white/60 backdrop-blur-2xl rounded-[3rem] p-6 sm:p-10 shadow-premium border border-white/80 space-y-6 text-center"
                >
                    <div className="space-y-4">
                        <div className="flex flex-col items-center gap-2 lg:gap-4">
                            <span className={`px-4 lg:px-5 py-1 rounded-full ${style.bg} ${style.text} text-[9px] sm:text-xs font-black uppercase tracking-[0.2em] border ${style.border}`}>
                                Level {level} — {levelLabel}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                                {title}
                            </h1>
                        </div>
                        <p className="text-base sm:text-lg text-slate-500 font-bold max-w-md mx-auto leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Information Chips - Compact */}
                    {chips.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {chips.map((chip, idx) => (
                                <div key={idx} className="px-4 py-2 rounded-xl bg-white border-2 border-slate-50 text-slate-600 text-[10px] sm:text-xs font-black flex items-center gap-2 shadow-sm">
                                    <span>{chip.icon}</span>
                                    {chip.text}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions - Reduced Padding */}
                    <div className="flex flex-col gap-3 lg:gap-4 pt-2">
                        <button
                            onClick={onStart}
                            className={`w-full py-4 sm:py-5 rounded-full ${style.button} text-white text-sm sm:text-base font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300`}
                        >
                            {buttonText}
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full py-3 rounded-full bg-white/50 text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-600 transition-all duration-300"
                        >
                            Back to Games
                        </button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

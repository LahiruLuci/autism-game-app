"use client";

import { motion } from "framer-motion";
import { Users, CheckCircle, TrendingUp, AlertCircle } from "lucide-react";
import type { FamilyProgressSummary } from "@/lib/progress";

interface ProgressHeroProps {
    parentName: string;
    family: FamilyProgressSummary;
}

export function ProgressHero({ parentName, family }: ProgressHeroProps) {
    const accuracyDisplay = family.familyAccuracy !== null
        ? `${family.familyAccuracy}%`
        : "No activity yet";

    return (
        <section className="relative pt-10 md:pt-20 pb-10 md:pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                    {/* Left: Headline */}
                    <div className="flex-1 text-center lg:text-left space-y-5 relative z-10">
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-5">
                                Parent Overview
                            </span>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                Progress <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dashboard</span>
                            </h1>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
                        >
                            Track learning activity, recommendations, and development progress across all children in one place.
                        </motion.p>
                    </div>

                    {/* Right: Visual summary */}
                    <div className="flex-1 w-full lg:max-w-lg relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[80px]" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="relative grid grid-cols-2 gap-4 p-2"
                        >
                            {[
                                { icon: <Users size={22} />, label: "Total Children", value: family.totalChildren, color: "text-blue-600", bg: "bg-blue-50" },
                                { icon: <CheckCircle size={22} />, label: "Activities Completed", value: family.totalActivities, color: "text-emerald-600", bg: "bg-emerald-50" },
                                { icon: <TrendingUp size={22} />, label: "Family Accuracy", value: accuracyDisplay, color: "text-amber-600", bg: "bg-amber-50" },
                                { icon: <AlertCircle size={22} />, label: "Children Needing Support", value: family.childrenNeedingAttention, color: "text-rose-600", bg: "bg-rose-50" },
                            ].map((card, idx) => (
                                <div key={idx} className="bg-white/80 backdrop-blur border border-white rounded-[2rem] p-6 shadow-sm space-y-3">
                                    <div className={`w-11 h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center`}>
                                        {card.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{card.label}</p>
                                        <p className="text-3xl font-black text-slate-900 mt-0.5">{card.value}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

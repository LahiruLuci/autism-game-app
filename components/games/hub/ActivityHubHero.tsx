"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import Link from "next/link";

interface ActivityHubHeroProps {
    childName: string;
    hasAssessment: boolean;
}

export function ActivityHubHero({ childName, hasAssessment }: ActivityHubHeroProps) {
    return (
        <section className="relative pt-12 md:pt-20 pb-12 md:pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left: Content */}
                    <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6">
                                Learning Activities
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                Explore Learning <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Activities</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            Discover personalized activities designed to support {childName}'s development based on their unique learning profile.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                        >
                            <button className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                                Continue Recommended Activities
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </button>
                            <Link
                                href="/development-areas"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white text-slate-600 border-2 border-slate-100 font-black text-sm uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all duration-300 flex items-center justify-center"
                            >
                                View Development Areas
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Visual Flow Component */}
                    <div className="flex-1 w-full lg:max-w-xl relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[100px] opacity-60" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative p-8 md:p-12 rounded-[3.5rem] bg-white/40 backdrop-blur-md border border-white/60 shadow-2xl space-y-10"
                        >
                            {[
                                { icon: <Target className="w-6 h-6 text-blue-500" />, label: "Assessment", text: "Profiles & Needs" },
                                { icon: <Zap className="w-6 h-6 text-amber-500" />, label: "Activities", text: "Tailored Exercises" },
                                { icon: <Sparkles className="w-6 h-6 text-emerald-500" />, label: "Progress", text: "Growth Insights" }
                            ].map((step, idx) => (
                                <div key={idx} className="relative">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center relative z-10">
                                            {step.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{step.label}</p>
                                            <p className="text-lg font-bold text-slate-800">{step.text}</p>
                                        </div>
                                    </div>
                                    {idx < 2 && (
                                        <div className="absolute left-7 top-14 w-px h-10 bg-gradient-to-b from-blue-200 to-transparent" />
                                    )}
                                </div>
                            ))}

                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

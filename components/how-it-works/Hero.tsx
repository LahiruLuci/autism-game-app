"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, UserPlus, FileText, Layout, PlayCircle, BarChart3, ChevronDown } from "lucide-react";

export function HowItWorksHero() {
    return (
        <section className="relative pt-12 md:pt-24 pb-12 md:pb-20 overflow-hidden">
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
                                Parent Guide
                            </span>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                See How BrightPath Supports Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Child's Journey</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base md:text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            From assessment to personalized activities and progress tracking, BrightPath helps parents understand and support their child's development.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                        >
                            <Link
                                href="/register"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                Get Started
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </Link>
                            <Link
                                href="/development-areas"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white text-slate-600 border-2 border-slate-100 font-black text-sm uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all duration-300 flex items-center justify-center"
                            >
                                View Development Areas
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Journey Illustration */}
                    <div className="flex-1 w-full lg:max-w-xl mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative min-h-[400px] md:aspect-square"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-[3rem] md:rounded-[4rem] -rotate-3 blur-3xl" />

                            <div className="relative bg-white/40 backdrop-blur-xl border-2 md:border-4 border-white/80 rounded-[3rem] md:rounded-[4rem] p-6 md:p-10 h-full flex flex-col justify-between shadow-premium overflow-hidden">
                                <JourneyStep icon={<UserPlus size={20} />} label="Parent" active />
                                <Connector />
                                <JourneyStep icon={<FileText size={20} />} label="Assessment" />
                                <Connector />
                                <JourneyStep icon={<Layout size={20} />} label="Personalized Plan" />
                                <Connector />
                                <JourneyStep icon={<PlayCircle size={20} />} label="Learning Activities" />
                                <Connector />
                                <JourneyStep icon={<BarChart3 size={20} />} label="Progress Tracking" />

                                {/* Animated progress beam */}
                                <div className="absolute left-[2.25rem] md:left-[3.25rem] top-12 md:top-16 bottom-12 md:bottom-16 w-1 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ top: ['0%', '100%'] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-full h-1/4 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-50/50 rounded-bl-[10rem] -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/50 rounded-tr-[5rem] -z-10" />
        </section>
    );
}

function JourneyStep({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <div className="flex items-center gap-8 relative z-10 transition-transform duration-300 hover:translate-x-2">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-all duration-500 ${active
                ? "bg-blue-600 border-blue-400 text-white"
                : "bg-white border-slate-50 text-slate-400 group-hover:border-blue-100"
                }`}>
                {icon}
            </div>
            <div className="flex flex-col">
                <p className={`text-sm font-black uppercase tracking-widest ${active ? "text-blue-600" : "text-slate-400"}`}>
                    {label}
                </p>
            </div>
        </div>
    );
}

function Connector() {
    return (
        <div className="ml-7 w-px h-12 bg-slate-100" />
    );
}

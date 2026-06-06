"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function DevelopmentHero() {
    return (
        <section className="relative pt-12 md:pt-32 pb-12 md:pb-24 overflow-hidden">
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
                                Development Areas
                            </span>
                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                Nurturing Growth <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Step by Step</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            Understand the developmental skills supported by BrightPath. We focus on core areas that help your child build confidence and navigate the world with greater independence.
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
                                Start Journey
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </Link>
                            <Link
                                href="/how-it-works"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white text-slate-600 border-2 border-slate-100 font-black text-sm uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all duration-300 flex items-center justify-center"
                            >
                                How It Works
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Growth Illustration */}
                    <div className="flex-1 w-full lg:max-w-xl relative pt-12 lg:pt-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-full blur-[100px] opacity-60" />
                        <div className="relative aspect-square flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="w-full h-full relative"
                            >
                                {/* Abstract Growth Visual */}
                                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                                    <motion.circle
                                        cx="200" cy="200" r="100"
                                        fill="white"
                                        initial={{ r: 0 }}
                                        animate={{ r: 100 }}
                                        transition={{ duration: 1.5, delay: 0.2 }}
                                    />
                                    <motion.path
                                        d="M200 300 V200 M200 200 L250 150 M200 200 L150 160"
                                        stroke="#2563eb"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2, delay: 0.5 }}
                                    />
                                    <motion.circle
                                        cx="250" cy="150" r="20" fill="#60a5fa"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 100, delay: 1.2 }}
                                    />
                                    <motion.circle
                                        cx="150" cy="160" r="15" fill="#818cf8"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 100, delay: 1.4 }}
                                    />
                                    <motion.circle
                                        cx="200" cy="100" r="25" fill="#3b82f6"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 100, delay: 1.6 }}
                                        className="animate-pulse"
                                    />
                                </svg>
                                {/* Floating labels */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute top-1/4 right-0 bg-white/80 backdrop-blur px-4 py-2 rounded-xl border border-blue-100 shadow-sm text-[10px] font-black text-blue-600 uppercase tracking-widest"
                                >
                                    Emotion
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className="absolute bottom-1/4 left-0 bg-white/80 backdrop-blur px-4 py-2 rounded-xl border border-indigo-100 shadow-sm text-[10px] font-black text-indigo-600 uppercase tracking-widest"
                                >
                                    Cognition
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

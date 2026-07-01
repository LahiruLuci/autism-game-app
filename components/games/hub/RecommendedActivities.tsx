"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { GameWithUnlockState } from "@/types/game";
import { getGameHref } from "@/lib/game-routes";

interface RecommendedActivitiesProps {
    childId: string;
    childName: string;
    games: GameWithUnlockState[];
}

export function RecommendedActivities({ childId, childName, games }: RecommendedActivitiesProps) {
    // Logic to identify recommended games:
    // 1. Unlocked games at the child's current level in each area.
    const recommendedGames = games.filter(g => g.is_unlocked).slice(0, 2);
    const suggestedNext = games.find(g => !g.is_unlocked);

    return (
        <section className="py-16 md:py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            Recommended For <span className="text-blue-600">{childName}</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium max-w-xl">
                            Activities selected based on assessment results and current learning progress.
                        </p>
                    </div>
                    <Link href="#all-activities" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
                        View All Library
                        <ChevronRight size={16} strokeWidth={3} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {recommendedGames.map((game, idx) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] blur-2xl group-hover:bg-blue-600/10 transition-all duration-500" />
                            <div className="relative bg-white border border-slate-100 rounded-[3rem] p-8 md:p-10 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                                {/* Status Badge */}
                                <div className="flex items-center justify-between mb-8">
                                    <span className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                                        Recommended
                                    </span>
                                    <div className="flex items-center gap-1.5 text-amber-500">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-xs font-black">Level {game.level}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                                            {game.game_name}
                                        </h3>
                                        <p className="text-slate-500 font-medium leading-relaxed line-clamp-2">
                                            A personalized {game.area.replace('_', ' ')} activity designed to build core developmental skills through interactive play.
                                        </p>
                                    </div>

                                    <Link
                                        href={getGameHref(childId, game.game_slug, game.level)}
                                        className="inline-flex items-center justify-center h-14 w-full md:w-auto px-8 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 gap-3 group/btn"
                                    >
                                        Launch Activity
                                        <Play size={16} fill="currentColor" />
                                    </Link>
                                </div>

                                {/* Decorative background element */}
                                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </motion.div>
                    ))}

                    {/* Suggested Next (if exists) */}
                    {suggestedNext && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 mt-8 md:mt-12 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 group"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300">
                                    <Star size={24} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Suggested Next</p>
                                    <h4 className="text-xl font-black text-slate-800">{suggestedNext.game_name}</h4>
                                    <p className="text-sm text-slate-500 font-medium">Unlock this activity by completing Level {suggestedNext.level - 1} exercises.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                                Locked <ArrowRight size={16} />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

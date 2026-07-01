"use client";

import { motion } from "framer-motion";
import { Play, Lock, Clock, BarChart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { GameWithUnlockState } from "@/types/game";
import { getGameHref } from "@/lib/game-routes";

interface ActivityLibraryProps {
    childId: string;
    games: GameWithUnlockState[];
}

export function ActivityLibrary({ childId, games }: ActivityLibraryProps) {
    return (
        <section id="all-activities" className="py-24 bg-slate-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Full Activity Library</h2>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl">
                        Explore our complete collection of developmental activities, filtered by your child's progress.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {games.map((game, idx) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 10) * 0.05 }}
                            className={`group flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-[2rem] border transition-all duration-300 ${game.is_unlocked
                                    ? "bg-white border-slate-100 hover:shadow-xl hover:border-blue-100"
                                    : "bg-slate-50 border-slate-200/60 opacity-80"
                                }`}
                        >
                            {/* Area Indicator */}
                            <div className="flex-shrink-0 w-full md:w-48 text-center md:text-left">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${game.area === 'emotion' ? 'bg-rose-50 text-rose-600' :
                                        game.area === 'cognitive' ? 'bg-blue-50 text-blue-600' :
                                            game.area === 'self_awareness' ? 'bg-indigo-50 text-indigo-600' :
                                                'bg-teal-50 text-teal-600'
                                    }`}>
                                    {game.area.replace('_', ' ')}
                                </span>
                            </div>

                            {/* Game Info */}
                            <div className="flex-1 space-y-2 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <h3 className="text-xl font-black text-slate-800">{game.game_name}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-3">
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <Clock size={14} />
                                            <span className="text-[10px] font-black uppercase font-mono">5-10m</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <BarChart size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Level {game.level}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
                                    Support developmental growth in {game.area.replace('_', ' ')} through this targeted Level {game.level} exercise.
                                </p>
                            </div>

                            {/* Status Action */}
                            <div className="flex-shrink-0 w-full md:w-auto">
                                {game.is_unlocked ? (
                                    <Link
                                        href={getGameHref(childId, game.game_slug, game.level)}
                                        className="flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                    >
                                        Play
                                        <Play size={16} fill="currentColor" />
                                    </Link>
                                ) : (
                                    <div className="flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-slate-200 text-slate-500 font-black text-sm uppercase tracking-widest cursor-not-allowed">
                                        <Lock size={16} />
                                        Locked
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

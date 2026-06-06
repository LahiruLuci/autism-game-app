"use client";

import { motion } from "framer-motion";
import { formatAreaName } from "@/lib/dashboard";
import type { RecentScore } from "@/lib/progress";

interface ActivityFeedProps {
    feed: (RecentScore & { childName: string })[];
}

function toRelativeDay(iso: string): string {
    const d = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const areaColor: Record<string, string> = {
    emotion: "bg-rose-50 text-rose-600",
    cognitive: "bg-blue-50 text-blue-600",
    self_awareness: "bg-indigo-50 text-indigo-600",
    mathematical: "bg-teal-50 text-teal-600",
};

export function ActivityFeed({ feed }: ActivityFeedProps) {
    if (feed.length === 0) return null;

    // Group by relative day
    const grouped: Record<string, (RecentScore & { childName: string })[]> = {};
    feed.forEach((s) => {
        const label = toRelativeDay(s.played_at);
        if (!grouped[label]) grouped[label] = [];
        grouped[label].push(s);
    });

    return (
        <section className="py-14 md:py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Recent Activity</h2>
                    <p className="text-slate-500 font-medium">A timeline of completed learning activities.</p>
                </div>

                <div className="max-w-3xl space-y-10">
                    {Object.entries(grouped).slice(0, 5).map(([day, scores], groupIdx) => (
                        <div key={day}>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-1">{day}</p>
                            <div className="space-y-3">
                                {scores.map((score, idx) => {
                                    const acc = score.attempts > 0 ? Math.round((score.correct_answers / score.attempts) * 100) : 0;
                                    const color = areaColor[score.area] ?? "bg-slate-50 text-slate-500";
                                    return (
                                        <motion.div
                                            key={score.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: (groupIdx * 3 + idx) * 0.04 }}
                                            className="flex items-center gap-5 bg-white rounded-[1.5rem] border border-slate-100 px-6 py-4 shadow-sm"
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black uppercase ${color}`}>
                                                {score.area.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black text-slate-800 text-sm truncate">{score.childName}</p>
                                                <p className="text-xs text-slate-500 font-medium">
                                                    {formatAreaName(score.area)} · Level {score.level}
                                                </p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-black text-slate-700">{acc}%</p>
                                                <p className="text-[10px] text-slate-400 font-medium">accuracy</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

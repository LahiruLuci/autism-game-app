"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, ClipboardList, Play } from "lucide-react";
import type { ChildProgressData, ParentInsight } from "@/lib/progress";
import { formatAreaName } from "@/lib/dashboard";

interface AttentionSectionProps {
    children: ChildProgressData[];
}

export function AttentionSection({ children }: AttentionSectionProps) {
    const flagged = children.filter((c) => c.needsAttention);
    if (flagged.length === 0) return null;

    return (
        <section className="py-14 md:py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Children Requiring Attention</h2>
                    <p className="text-slate-500 font-medium">These children may benefit from additional support or a next activity.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {flagged.map((row, idx) => (
                        <motion.div
                            key={row.child.id}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className="group bg-white border border-amber-100 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                                {row.status === "no_assessment" ? <ClipboardList size={22} /> : <AlertTriangle size={22} />}
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                                <div>
                                    <p className="font-black text-slate-800 text-lg">{row.child.child_name}</p>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed mt-1">{row.attentionReason}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                                    {row.status === "no_assessment" ? (
                                        <Link
                                            href={`/survey/${row.child.id}`}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all w-full sm:w-auto"
                                        >
                                            <ClipboardList size={14} /> Start Assessment
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`/games/${row.child.id}`}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all w-full sm:w-auto"
                                        >
                                            <Play size={14} fill="currentColor" /> Continue Learning
                                        </Link>
                                    )}
                                    <Link
                                        href={`/children/${row.child.id}`}
                                        className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-slate-100 text-slate-600 text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all w-full sm:w-auto"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface InsightsSectionProps {
    insights: ParentInsight[];
    children: ChildProgressData[];
}

export function InsightsSection({ insights, children }: InsightsSectionProps) {
    if (insights.length === 0) return null;

    const styleMap = {
        positive: "bg-emerald-50 border-emerald-100 text-emerald-700",
        neutral: "bg-blue-50 border-blue-100 text-blue-700",
        support: "bg-amber-50 border-amber-100 text-amber-700",
    };

    return (
        <section className="py-14 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Parent Insights</h2>
                    <p className="text-slate-500 font-medium">Observations based on your family's current learning data.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {insights.map((insight, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.07 }}
                            className={`p-6 rounded-[2rem] border text-sm font-semibold leading-relaxed ${styleMap[insight.type]}`}
                        >
                            {insight.text}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

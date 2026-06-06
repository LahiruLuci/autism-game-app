"use client";

import { motion } from "framer-motion";
import { Activity, Star, Target, Calendar } from "lucide-react";

interface ProgressSnapshotProps {
    summary: {
        totalGamesPlayed: number;
        latestActivityDate: string | null;
        averageAccuracy: number;
        latestLevel: number | null;
        latestArea: string | null;
    } | null;
}

export function ProgressSnapshot({ summary }: ProgressSnapshotProps) {
    if (!summary || summary.totalGamesPlayed === 0) {
        return (
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-12 rounded-[3rem] bg-slate-50 border border-slate-100 text-center space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300 mx-auto">
                            <Activity size={24} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-900">Ready to Begin tracking?</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">
                                Start your first learning activity to begin seeing personalized progress insights here.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const cards = [
        { label: "Activities Completed", value: summary.totalGamesPlayed, icon: <Activity />, color: "text-blue-600", bgColor: "bg-blue-50" },
        { label: "Average Accuracy", value: `${summary.averageAccuracy}%`, icon: <Star />, color: "text-amber-600", bgColor: "bg-amber-50" },
        { label: "Current Level", value: `Level ${summary.latestLevel || 1}`, icon: <Target />, color: "text-emerald-600", bgColor: "bg-emerald-50" },
        { label: "Last Active", value: summary.latestActivityDate ? new Date(summary.latestActivityDate).toLocaleDateString() : 'N/A', icon: <Calendar />, color: "text-indigo-600", bgColor: "bg-indigo-50" }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100/50 space-y-6"
                        >
                            <div className={`w-12 h-12 rounded-xl ${card.bgColor} ${card.color} flex items-center justify-center`}>
                                {card.icon}
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{card.label}</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

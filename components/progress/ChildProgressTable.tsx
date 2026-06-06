"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, User, ChevronRight } from "lucide-react";
import { formatAreaName } from "@/lib/dashboard";
import type { ChildProgressData } from "@/lib/progress";

const statusConfig = {
    excellent: { pill: "bg-emerald-50 text-emerald-700 border-emerald-100", dot: "bg-emerald-500" },
    doing_well: { pill: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500" },
    needs_support: { pill: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-500" },
    inactive: { pill: "bg-slate-100 text-slate-500 border-slate-200", dot: "bg-slate-400" },
    no_assessment: { pill: "bg-rose-50 text-rose-600 border-rose-100", dot: "bg-rose-400" },
};

function formatDate(iso: string | null) {
    if (!iso) return "No activity yet";
    const d = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface ChildProgressTableProps {
    children: ChildProgressData[];
}

export function ChildProgressTable({ children }: ChildProgressTableProps) {
    if (children.length === 0) return null;

    return (
        <section className="py-14 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">All Children</h2>
                    <p className="text-slate-500 font-medium">A snapshot of each child's current learning status.</p>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                {["Child", "Level", "Activities", "Accuracy", "Last Activity", "Status", "Actions"].map((h) => (
                                    <th key={h} className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {children.map((row, idx) => {
                                const cfg = statusConfig[row.status];
                                return (
                                    <motion.tr
                                        key={row.child.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-slate-50/60 transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                                    <User size={16} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800">{row.child.child_name}</p>
                                                    <p className="text-xs text-slate-400 font-medium">Age {row.child.age}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-700">
                                            {row.latestLevel ? `Level ${row.latestLevel}` : "—"}
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-700">{row.totalActivities}</td>
                                        <td className="px-6 py-5">
                                            {row.totalActivities > 0 ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 max-w-[80px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full transition-all"
                                                            style={{ width: `${row.averageAccuracy}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-black text-slate-700">{row.averageAccuracy}%</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-slate-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-sm font-medium text-slate-500">{formatDate(row.lastActivityDate)}</td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-widest ${cfg.pill}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                                {row.statusLabel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/children/${row.child.id}`}
                                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                                                >
                                                    <User size={12} /> Profile
                                                </Link>
                                                <Link
                                                    href={`/games/${row.child.id}`}
                                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
                                                >
                                                    <Play size={12} fill="currentColor" /> Play
                                                </Link>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile: Stacked cards */}
                <div className="md:hidden space-y-4">
                    {children.map((row, idx) => {
                        const cfg = statusConfig[row.status];
                        return (
                            <motion.div
                                key={row.child.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.06 }}
                                className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 space-y-5"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 text-lg">{row.child.child_name}</p>
                                            <p className="text-xs text-slate-400 font-medium">Age {row.child.age}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${cfg.pill}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                        {row.statusLabel}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-center">
                                    {[
                                        { label: "Activities", value: row.totalActivities },
                                        { label: "Accuracy", value: row.totalActivities > 0 ? `${row.averageAccuracy}%` : "—" },
                                        { label: "Level", value: row.latestLevel ? `L${row.latestLevel}` : "—" },
                                    ].map((m) => (
                                        <div key={m.label}>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{m.label}</p>
                                            <p className="text-xl font-black text-slate-800 mt-1">{m.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-xs text-slate-400 font-medium">Last active: {formatDate(row.lastActivityDate)}</p>

                                <div className="flex gap-3">
                                    <Link href={`/children/${row.child.id}`} className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                                        <User size={14} /> Profile
                                    </Link>
                                    <Link href={`/games/${row.child.id}`} className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                                        <Play size={14} fill="currentColor" /> Continue
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

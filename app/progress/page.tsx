"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { getProgressDashboardData } from "@/lib/progress";
import type { ChildProgressData, FamilyProgressSummary, RecentScore, ParentInsight } from "@/lib/progress";
import { getCurrentParent } from "@/lib/children";
import type { ParentProfile } from "@/lib/children";

import { LoadingState } from "@/components/ui/LoadingState";
import { CalmBackground } from "@/components/ui/CalmBackground";
import { ProgressHero } from "@/components/progress/ProgressHero";
import { ChildProgressTable } from "@/components/progress/ChildProgressTable";
import { AttentionSection, InsightsSection } from "@/components/progress/AttentionAndInsights";
import { ActivityFeed } from "@/components/progress/ActivityFeed";
import { ProgressEmptyState, ProgressNoActivityState, ProgressFinalCTA } from "@/components/progress/ProgressExtras";

export default function ProgressPage() {
    const router = useRouter();
    const [parent, setParent] = useState<ParentProfile | null>(null);
    const [children, setChildren] = useState<ChildProgressData[]>([]);
    const [family, setFamily] = useState<FamilyProgressSummary>({ totalChildren: 0, totalActivities: 0, averageAccuracy: 0, childrenNeedingAttention: 0 });
    const [feed, setFeed] = useState<(RecentScore & { childName: string })[]>([]);
    const [insights, setInsights] = useState<ParentInsight[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const [parentData, progressData] = await Promise.all([
                    getCurrentParent(),
                    getProgressDashboardData(),
                ]);
                if (!mounted) return;
                setParent(parentData);
                setChildren(progressData.children);
                setFamily(progressData.family);
                setFeed(progressData.recentFeed);
                setInsights(progressData.insights);
            } catch (err) {
                if (!mounted) return;
                if (err instanceof Error && err.message === "not_authenticated") {
                    router.replace("/login");
                    return;
                }
                setError("Could not load the progress dashboard. Please try again.");
            } finally {
                if (mounted) setIsLoading(false);
            }
        }
        load();
        return () => { mounted = false; };
    }, [router]);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <LoadingState message="Loading your progress dashboard..." />
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="text-center space-y-4">
                    <p className="text-xl font-black text-slate-800">Something went wrong</p>
                    <p className="text-slate-500 font-medium">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all">
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    const hasChildren = children.length > 0;
    const hasActivity = family.totalActivities > 0;

    return (
        <main className="min-h-screen bg-white relative overflow-x-hidden">
            <CalmBackground />

            <div className="relative z-10">
                {/* Hero + family summary */}
                <ProgressHero parentName={parent?.full_name ?? ""} family={family} />

                {!hasChildren ? (
                    <ProgressEmptyState />
                ) : (
                    <>
                        {/* Per-child table (desktop) / cards (mobile) */}
                        <ChildProgressTable children={children} />

                        {/* Children needing attention */}
                        <AttentionSection children={children} />

                        {/* Parent insights */}
                        <InsightsSection insights={insights} children={children} />

                        {/* Activity feed or empty state */}
                        {hasActivity ? (
                            <ActivityFeed feed={feed} />
                        ) : (
                            <ProgressNoActivityState children={children.map((c) => ({ id: c.child.id, child_name: c.child.child_name }))} />
                        )}

                        {/* Final CTA */}
                        <ProgressFinalCTA />
                    </>
                )}
            </div>

            <footer className="py-10 border-t border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    BrightPath · Family Progress Dashboard
                </p>
            </footer>
        </main>
    );
}

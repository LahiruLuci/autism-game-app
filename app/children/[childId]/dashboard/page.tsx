"use client";

import { useEffect, useState } from "react";
import { getChildDashboardData, DashboardData } from "@/lib/dashboard";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoadingState } from "@/components/ui/LoadingState";

// Components
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { AreaProgressOverview } from "@/components/dashboard/AreaProgressOverview";
import { GamePerformanceTable } from "@/components/dashboard/GamePerformanceTable";
import { RecentActivityTimeline } from "@/components/dashboard/RecentActivityTimeline";
import { RecommendedNextActivity } from "@/components/dashboard/RecommendedNextActivity";
import { ParentDashboardNote } from "@/components/dashboard/ParentDashboardNote";
import { DashboardEmptyState } from "@/components/dashboard/DashboardEmptyState";
import { ScoreTrendChart, AreaAverageChart } from "@/components/dashboard/Charts";

export default function ParentDashboardPage() {
  const router = useRouter();
  const params = useParams<{ childId: string }>();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (!params?.childId) return;
      
      try {
        const data = await getChildDashboardData(params.childId);
        if (!data) {
          router.push("/children");
          return;
        }
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        router.push("/children");
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, [params?.childId, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <LoadingState message="Loading progress dashboard..." />
      </main>
    );
  }

  if (!dashboardData) return null;

  const { child, assessment, scores, games, summary, areaStats, recommendedActivity } = dashboardData;

  // Empty States
  if (!assessment) {
    return (
      <main className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Link href="/children" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} /> Back to Children
          </Link>
          <DashboardEmptyState childId={params.childId} type="no_assessment" />
        </div>
      </main>
    );
  }

  if (scores.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Link href="/children" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} /> Back to Children
          </Link>
          <DashboardHero 
            child={child} 
            level={assessment.predicted_level} 
            lastSurveyDate={assessment.created_at} 
            totalActivities={0} 
          />
          <DashboardEmptyState childId={params.childId} type="no_scores" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Navigation */}
        <Link href="/children" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors px-2">
          <ArrowLeft size={16} /> Back to Profiles
        </Link>

        {/* Hero Section */}
        <DashboardHero 
          child={child} 
          level={assessment.predicted_level} 
          lastSurveyDate={assessment.created_at} 
          totalActivities={summary.totalActivities} 
        />

        {/* Key Metrics */}
        <SummaryCards summary={summary} level={assessment.predicted_level} />

        {/* Charts & Area Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <AreaProgressOverview areaStats={areaStats} />
          </div>
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex-1">
              <ScoreTrendChart scores={scores} />
            </div>
            <div className="flex-1">
              <AreaAverageChart areaStats={areaStats} />
            </div>
          </div>
        </div>

        {/* Timeline & Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <RecentActivityTimeline scores={scores} games={games} />
          <RecommendedNextActivity childId={params.childId} recommendation={recommendedActivity} />
        </div>

        {/* Full Performance Table */}
        <GamePerformanceTable scores={scores} games={games} />

        {/* Disclaimer Note */}
        <ParentDashboardNote />

      </div>
    </main>
  );
}

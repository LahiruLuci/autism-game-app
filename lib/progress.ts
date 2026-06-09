import { supabase } from "./supabase";
import { getChildrenForCurrentParent, getLatestAssessmentForChild } from "./children";
import { formatAreaName } from "./dashboard";
import type { ChildProfile } from "@/types/child";
import type { LatestAssessment } from "./children";

export interface ChildProgressData {
    child: ChildProfile;
    assessment: LatestAssessment | null;
    totalActivities: number;
    averageAccuracy: number;
    lastActivityDate: string | null;
    latestLevel: number | null;
    latestArea: string | null;
    status: "excellent" | "doing_well" | "needs_support" | "inactive" | "no_assessment";
    statusLabel: string;
    needsAttention: boolean;
    attentionReason: string | null;
    recentScores: RecentScore[];
}

export interface RecentScore {
    id: string;
    game_name?: string;
    area: string;
    level: number;
    final_score: number;
    correct_answers: number;
    attempts: number;
    played_at: string;
    child_id: string;
}

export interface FamilyProgressSummary {
    totalChildren: number;
    totalActivities: number;
    familyAccuracy: number | null;
    childrenNeedingAttention: number;
}

export interface ParentInsight {
    text: string;
    type: "positive" | "neutral" | "support";
}

function computeStatus(
    averageAccuracy: number,
    lastActivityDate: string | null,
    hasAssessment: boolean
): { status: ChildProgressData["status"]; label: string } {
    if (!hasAssessment) return { status: "no_assessment", label: "Assessment Needed" };
    if (!lastActivityDate) return { status: "inactive", label: "Not Started" };

    const daysSince = lastActivityDate
        ? (Date.now() - new Date(lastActivityDate).getTime()) / (1000 * 60 * 60 * 24)
        : 999;

    if (daysSince > 7) return { status: "inactive", label: "Inactive" };
    if (averageAccuracy >= 90) return { status: "excellent", label: "Excellent" };
    if (averageAccuracy >= 70) return { status: "doing_well", label: "Doing Well" };
    return { status: "needs_support", label: "Needs Support" };
}

export async function getProgressDashboardData(): Promise<{
    children: ChildProgressData[];
    family: FamilyProgressSummary;
    recentFeed: (RecentScore & { childName: string })[];
    insights: ParentInsight[];
}> {
    const { children } = await getChildrenForCurrentParent();

    if (children.length === 0) {
        return {
            children: [],
            family: { totalChildren: 0, totalActivities: 0, familyAccuracy: null, childrenNeedingAttention: 0 },
            recentFeed: [],
            insights: [],
        };
    }

    const childIds = children.map((c) => c.id);

    // Fetch assessments + scores in parallel
    const [assessmentResults, scoresResult] = await Promise.all([
        Promise.all(children.map((c) => getLatestAssessmentForChild(c.id))),
        supabase
            .from("game_scores")
            .select("id, child_id, area, level, final_score, correct_answers, attempts, played_at")
            .in("child_id", childIds)
            .order("played_at", { ascending: false })
            .limit(200),
    ]);

    const allScores: RecentScore[] = (scoresResult.data ?? []) as RecentScore[];

    // Build per-child data
    const childrenData: ChildProgressData[] = children.map((child, idx) => {
        const assessment = assessmentResults[idx] ?? null;
        const scores = allScores.filter((s) => s.child_id === child.id);

        const totalActivities = scores.length;
        const totalAcc = scores.reduce((sum, s) => {
            return sum + (s.attempts > 0 ? (s.correct_answers / s.attempts) * 100 : 0);
        }, 0);
        const averageAccuracy = totalActivities > 0 ? Math.round(totalAcc / totalActivities) : 0;
        const lastActivityDate = scores[0]?.played_at ?? null;
        const latestLevel = scores[0]?.level ?? null;
        const latestArea = scores[0]?.area ?? null;

        const { status, label } = computeStatus(averageAccuracy, lastActivityDate, !!assessment);

        const needsAttention =
            !assessment ||
            status === "needs_support" ||
            status === "inactive" ||
            status === "no_assessment";

        let attentionReason: string | null = null;
        if (!assessment) attentionReason = "Assessment not yet completed.";
        else if (status === "inactive") attentionReason = "No activity in the last 7 days.";
        else if (status === "needs_support") attentionReason = `Average accuracy is ${averageAccuracy}%. Additional practice recommended.`;

        return {
            child,
            assessment,
            totalActivities,
            averageAccuracy,
            lastActivityDate,
            latestLevel,
            latestArea,
            status,
            statusLabel: label,
            needsAttention,
            attentionReason,
            recentScores: scores.slice(0, 5),
        };
    });

    // Family summary
    const totalActivities = childrenData.reduce((sum, c) => sum + c.totalActivities, 0);
    const activeChildren = childrenData.filter((c) => c.totalActivities > 0);
    const familyAccuracy = activeChildren.length > 0
        ? Math.round(activeChildren.reduce((sum, c) => sum + c.averageAccuracy, 0) / activeChildren.length)
        : null;

    const family: FamilyProgressSummary = {
        totalChildren: children.length,
        totalActivities,
        familyAccuracy,
        childrenNeedingAttention: childrenData.filter((c) => c.needsAttention).length,
    };

    // Recent feed
    const recentFeed = allScores.slice(0, 20).map((s) => ({
        ...s,
        childName: children.find((c) => c.id === s.child_id)?.child_name ?? "Unknown",
    }));

    // Insights
    const insights: ParentInsight[] = generateInsights(childrenData, family);

    return { children: childrenData, family, recentFeed, insights };
}

function generateInsights(children: ChildProgressData[], family: FamilyProgressSummary): ParentInsight[] {
    const insights: ParentInsight[] = [];

    if (family.totalActivities === 0) return insights;

    // Best performing child
    const sorted = [...children].sort((a, b) => b.averageAccuracy - a.averageAccuracy);
    if (sorted[0]?.totalActivities > 0) {
        insights.push({ text: `Most active learner this week: ${sorted[0].child.child_name}.`, type: "positive" });
    }

    // Family accuracy insight
    if (family.familyAccuracy !== null) {
        if (family.familyAccuracy >= 80) {
            insights.push({ text: `Family accuracy is strong at ${family.familyAccuracy}%. Keep up the great work!`, type: "positive" });
        } else {
            insights.push({ text: `Family accuracy is ${family.familyAccuracy}%. Consistent daily practice helps improve this over time.`, type: "neutral" });
        }
    }

    // Area insights - find most common area across all children
    const areaCount: Record<string, number> = {};
    children.forEach((c) => { if (c.latestArea) areaCount[c.latestArea] = (areaCount[c.latestArea] || 0) + 1; });
    const topArea = Object.entries(areaCount).sort(([, a], [, b]) => b - a)[0]?.[0];
    if (topArea) {
        insights.push({ text: `${formatAreaName(topArea)} is your family's most practiced developmental area.`, type: "neutral" });
    }

    // Children needing support
    const needingSupport = children.filter((c) => c.status === "needs_support");
    needingSupport.forEach((c) => {
        if (c.latestArea) {
            insights.push({ text: `${c.child.child_name} may benefit from extra ${formatAreaName(c.latestArea)} practice.`, type: "support" });
        }
    });

    return insights.slice(0, 4);
}

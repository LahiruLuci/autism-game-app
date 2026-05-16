import { supabase } from "./supabase";
import { getChildForCurrentParent } from "./children";
import { getLatestAssessmentForCurrentParent } from "./survey";
import { getActiveGames } from "./games";
import { ChildProfile } from "@/types/child";
import { AssessmentResult } from "@/types/assessment";
import { Game } from "@/types/game";
import { GameScore } from "@/types/score";

export interface DashboardData {
  child: ChildProfile;
  assessment: AssessmentResult | null;
  scores: GameScore[];
  games: Game[];
  summary: DashboardSummary;
  areaStats: AreaStat[];
  recommendedActivity: RecommendedActivity | null;
}

export interface DashboardSummary {
  totalActivities: number;
  averageScore: number;
  averageTime: number;
  highestScore: number;
  latestActivity: GameScore | null;
  mostPlayedArea: string | null;
}

export interface AreaStat {
  area: string;
  gamesPlayed: number;
  averageScore: number;
  averageTime: number;
  latestLevel: number | null;
  progressPercent: number;
}

export interface RecommendedActivity {
  game: Game;
  reason: string;
}

export async function getChildDashboardData(childId: string): Promise<DashboardData | null> {
  // 1. Get child profile (verifies parent ownership implicitly via getChildForCurrentParent)
  const { child } = await getChildForCurrentParent(childId);
  if (!child) return null;

  // 2. Get latest assessment
  const assessment = await getLatestAssessmentForCurrentParent(childId).catch(() => null);

  // 3. Get all active games
  const games = await getActiveGames();

  // 4. Get all game scores for child
  const { data: scoresData, error: scoresError } = await supabase
    .from("game_scores")
    .select("*")
    .eq("child_id", childId)
    .order("played_at", { ascending: false });

  const scores = (scoresError ? [] : scoresData) as GameScore[];

  // 5. Calculate metrics
  const summary = calculateDashboardSummary(scores);
  const areaStats = calculateAreaStats(scores);
  const recommendedActivity = getRecommendedNextActivity(child, assessment, scores, games, areaStats);

  return {
    child,
    assessment,
    scores,
    games,
    summary,
    areaStats,
    recommendedActivity,
  };
}

export function calculateDashboardSummary(scores: GameScore[]): DashboardSummary {
  if (!scores || scores.length === 0) {
    return {
      totalActivities: 0,
      averageScore: 0,
      averageTime: 0,
      highestScore: 0,
      latestActivity: null,
      mostPlayedArea: null,
    };
  }

  const totalActivities = scores.length;
  let totalScore = 0;
  let totalTime = 0;
  let highestScore = 0;
  const latestActivity = scores[0]; // Already ordered by played_at desc
  const areaCounts: Record<string, number> = {};

  scores.forEach(score => {
    totalScore += score.final_score;
    totalTime += score.time_taken;
    if (score.final_score > highestScore) {
      highestScore = score.final_score;
    }
    areaCounts[score.area] = (areaCounts[score.area] || 0) + 1;
  });

  const averageScore = Math.round(totalScore / totalActivities);
  const averageTime = Math.round(totalTime / totalActivities);
  
  let mostPlayedArea = null;
  let maxCount = 0;
  for (const [area, count] of Object.entries(areaCounts)) {
    if (count > maxCount) {
      mostPlayedArea = area;
      maxCount = count;
    }
  }

  return {
    totalActivities,
    averageScore,
    averageTime,
    highestScore,
    latestActivity,
    mostPlayedArea,
  };
}

export function calculateAreaStats(scores: GameScore[]): AreaStat[] {
  const areas = ["emotion", "cognitive", "self_awareness", "mathematical"];
  const stats: AreaStat[] = [];

  areas.forEach(area => {
    const areaScores = scores.filter(s => s.area === area);
    if (areaScores.length === 0) {
      stats.push({
        area,
        gamesPlayed: 0,
        averageScore: 0,
        averageTime: 0,
        latestLevel: null,
        progressPercent: 0,
      });
      return;
    }

    let totalScore = 0;
    let totalTime = 0;
    let latestLevel = areaScores[0].level;

    areaScores.forEach(score => {
      totalScore += score.final_score;
      totalTime += score.time_taken;
    });

    const averageScore = Math.round(totalScore / areaScores.length);
    const averageTime = Math.round(totalTime / areaScores.length);
    const progressPercent = Math.min(averageScore, 100);

    stats.push({
      area,
      gamesPlayed: areaScores.length,
      averageScore,
      averageTime,
      latestLevel,
      progressPercent,
    });
  });

  return stats;
}

export function getRecommendedNextActivity(
  child: ChildProfile,
  assessment: AssessmentResult | null,
  scores: GameScore[],
  games: Game[],
  areaStats: AreaStat[]
): RecommendedActivity | null {
  if (games.length === 0) return null;

  // Recommended level is based on assessment, or default to 1
  const recommendedLevel = assessment?.predicted_level || 1;
  const unlockedGames = games.filter(g => g.level <= recommendedLevel);
  
  if (unlockedGames.length === 0) return { game: games[0], reason: "Try your first activity!" };

  // 1. If no scores, recommend first unlocked game
  if (scores.length === 0) {
    return {
      game: unlockedGames[0],
      reason: "This is a great starting point for your learning journey."
    };
  }

  // 2. Check if latest assessment has main_support_area
  if (assessment?.main_support_area) {
    const supportAreaGames = unlockedGames.filter(g => g.area === assessment.main_support_area);
    if (supportAreaGames.length > 0) {
       // pick one not played recently if possible, or just the first one
       return {
         game: supportAreaGames[0],
         reason: "Based on the recent survey, this activity provides excellent gentle support."
       };
    }
  }

  // 3. Find area with lowest average score (needs practice)
  const playedAreas = areaStats.filter(stat => stat.gamesPlayed > 0);
  if (playedAreas.length > 0) {
    let lowestScoreArea = playedAreas[0];
    for (const stat of playedAreas) {
      if (stat.averageScore < lowestScoreArea.averageScore) {
        lowestScoreArea = stat;
      }
    }
    const practiceGames = unlockedGames.filter(g => g.area === lowestScoreArea.area);
    if (practiceGames.length > 0) {
      return {
        game: practiceGames[0],
        reason: "This activity helps practice an area where calm repetition is beneficial."
      };
    }
  }

  // 4. Default to continuing current level games
  return {
    game: unlockedGames[Math.floor(Math.random() * unlockedGames.length)],
    reason: "A great choice for continuing everyday practice and building confidence."
  };
}

export function formatTime(seconds: number): string {
  if (!seconds || seconds <= 0) return "0s";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) {
    return `${m}m ${s}s`;
  }
  return `${s}s`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatAreaName(area: string): string {
  const map: Record<string, string> = {
    emotion: "Emotion Skills",
    cognitive: "Cognitive Skills",
    self_awareness: "Self-awareness",
    mathematical: "Mathematical Skills"
  };
  return map[area] || area;
}

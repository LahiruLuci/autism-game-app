import { SurveyArea } from "@/types/survey";

/**
 * Rules:
 * Each area has 8 questions.
 * Each question max score is 4.
 * Max score per area = 32.
 *
 * Area level mapping:
 * 0–10 = Level 1
 * 11–21 = Level 2
 * 22–32 = Level 3
 */
export function calculateAreaLevel(score: number): number {
  if (score <= 10) return 1;
  if (score <= 21) return 2;
  return 3;
}

/**
 * Calculates area-specific levels and identifies main support/strongest areas.
 * Priority order for ties: emotion, cognitive, self_awareness, mathematical.
 */
export function calculateAreaRecommendations(scores: {
  emotion_score: number;
  cognitive_score: number;
  self_awareness_score: number;
  math_score: number;
}) {
  const emotion_level = calculateAreaLevel(scores.emotion_score);
  const cognitive_level = calculateAreaLevel(scores.cognitive_score);
  const self_awareness_level = calculateAreaLevel(scores.self_awareness_score);
  const math_level = calculateAreaLevel(scores.math_score);

  const areas: { area: SurveyArea; score: number }[] = [
    { area: "emotion", score: scores.emotion_score },
    { area: "cognitive", score: scores.cognitive_score },
    { area: "self_awareness", score: scores.self_awareness_score },
    { area: "mathematical", score: scores.math_score },
  ];

  // Find main support area (lowest score). Priority handled by find logic on sorted/stable array.
  let main_support_area: SurveyArea = "emotion";
  let minScore = Infinity;
  for (const item of areas) {
    if (item.score < minScore) {
      minScore = item.score;
      main_support_area = item.area;
    }
  }

  // Find strongest area (highest score).
  let strongest_area: SurveyArea = "emotion";
  let maxScore = -Infinity;
  for (const item of areas) {
    if (item.score > maxScore) {
      maxScore = item.score;
      strongest_area = item.area;
    }
  }

  return {
    emotion_level,
    cognitive_level,
    self_awareness_level,
    math_level,
    main_support_area,
    strongest_area,
  };
}

export function getAreaLabel(area: SurveyArea | string): string {
  switch (area) {
    case "emotion":
      return "Emotion";
    case "cognitive":
      return "Cognitive Skills";
    case "self_awareness":
      return "Self-awareness";
    case "mathematical":
      return "Mathematical Skills";
    default:
      return typeof area === "string" ? area : "Unknown Area";
  }
}

export function isAreaRecommendationsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_AREA_RECOMMENDATIONS === "true";
}

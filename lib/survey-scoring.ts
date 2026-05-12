import type { SurveyAnswers, SurveyQuestion, SurveyScores } from "@/types/survey";

export function calculateSurveyScores(
  questions: SurveyQuestion[],
  answers: SurveyAnswers,
): SurveyScores {
  const scores: SurveyScores = {
    emotion_score: 0,
    cognitive_score: 0,
    self_awareness_score: 0,
    math_score: 0,
    total_score: 0,
  };

  for (const question of questions) {
    const answerScore = answers[question.id] ?? 0;

    if (question.area === "emotion") {
      scores.emotion_score += answerScore;
    }

    if (question.area === "cognitive") {
      scores.cognitive_score += answerScore;
    }

    if (question.area === "self_awareness") {
      scores.self_awareness_score += answerScore;
    }

    if (question.area === "mathematical") {
      scores.math_score += answerScore;
    }
  }

  scores.total_score =
    scores.emotion_score +
    scores.cognitive_score +
    scores.self_awareness_score +
    scores.math_score;

  return scores;
}

/**
 * Standardized scoring formula for BrightPath games.
 * final_score = (correct * 10) - (wrong * 3) - (time_taken / 30)
 * Minimum score is always 0.
 */
export function calculateGameScore({
  correctAnswers,
  wrongAnswers,
  timeTaken,
}: {
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: number;
}) {
  const timePenalty = Math.floor(timeTaken / 30);
  const rawScore = correctAnswers * 10 - wrongAnswers * 3 - timePenalty;
  return Math.max(rawScore, 0);
}

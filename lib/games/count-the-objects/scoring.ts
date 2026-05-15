export function calculateCountingScore({
  correctAnswers,
  wrongAnswers,
  timeTaken,
  timePenaltyDivisor,
}: {
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: number;
  timePenaltyDivisor: number;
}) {
  const timePenalty = timePenaltyDivisor > 0 ? Math.floor(timeTaken / timePenaltyDivisor) : 0;
  const rawScore = correctAnswers * 10 - wrongAnswers * 2 - timePenalty;
  return Math.max(rawScore, 0);
}

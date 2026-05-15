export function calculateReflectionScore({
  completedRounds,
  totalRounds,
  timeTaken,
  timePenaltyDivisor = 60,
}: {
  completedRounds: number;
  totalRounds: number;
  timeTaken: number;
  timePenaltyDivisor?: number;
}) {
  // Base score is completion based
  const completionPercentage = (completedRounds / totalRounds) * 100;
  
  // Participation points (just for finishing)
  const participationPoints = 20;
  
  // Tiny time penalty to keep consistency with other games, 
  // but heavily reduced to avoid stress.
  const timePenalty = Math.floor(timeTaken / timePenaltyDivisor);
  
  const finalScore = Math.round(completionPercentage + participationPoints - timePenalty);
  
  // Cap at 100 for display consistency, though 120 is technically possible with bonus
  return Math.min(Math.max(finalScore, 0), 100);
}

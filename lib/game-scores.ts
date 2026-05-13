import { supabase } from "./supabase";
import { GameArea } from "@/types/game";

export interface SaveScoreInput {
  child_id: string;
  game_id: string;
  area: GameArea;
  level: number;
  correct_answers: number;
  wrong_answers: number;
  attempts: number;
  time_taken: number;
  final_score: number;
}

export async function saveGameScore(input: SaveScoreInput) {
  const { data, error } = await supabase
    .from("game_scores")
    .insert({
      child_id: input.child_id,
      game_id: input.game_id,
      area: input.area,
      level: input.level,
      correct_answers: input.correct_answers,
      wrong_answers: input.wrong_answers,
      attempts: input.attempts,
      time_taken: input.time_taken,
      final_score: input.final_score,
      played_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) {
    console.error("[BrightPath] Game score insert failed:", JSON.stringify(error, null, 2));
    throw new Error("score_save_failed");
  }

  return data.id; // Returns the sessionId
}

export async function getGameScoreById(sessionId: string) {
  const { data, error } = await supabase
    .from("game_scores")
    .select("*, games(game_name)")
    .eq("id", sessionId)
    .single();

  if (error) {
    console.error("[BrightPath] Error fetching game score:", error);
    return null;
  }

  return data;
}

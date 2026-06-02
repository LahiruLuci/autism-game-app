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

export async function saveGameScore(input: SaveScoreInput, retryCount = 0) {
  try {
    console.log("[BrightPath] Attempting to save game score:", {
      game_id: input.game_id,
      child_id: input.child_id,
      final_score: input.final_score
    });

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
      console.error("[BrightPath] Database error while saving score:", error);
      throw error;
    }

    if (!data) {
      throw new Error("No data returned after score insert");
    }

    console.log("[BrightPath] Score saved successfully. Session ID:", data.id);
    return data.id; // Returns the sessionId
  } catch (error: any) {
    // Retry logic for network-related errors (like Failed to fetch)
    const isNetworkError = error?.message === "TypeError: Failed to fetch" || error?.message?.includes("fetch");

    if (isNetworkError && retryCount < 2) {
      console.warn(`[BrightPath] Network issue detected. Retrying score save... (Attempt ${retryCount + 1})`);
      // Wait a short moment before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
      return saveGameScore(input, retryCount + 1);
    }

    console.error("[BrightPath] Final failure saving game score:", error);
    throw new Error("score_save_failed");
  }
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

export async function getPreviousGameScore(childId: string, gameId: string, currentSessionId: string) {
  const { data, error } = await supabase
    .from("game_scores")
    .select("*")
    .eq("child_id", childId)
    .eq("game_id", gameId)
    .neq("id", currentSessionId)
    .order("played_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[BrightPath] Error fetching previous game score:", error);
    return null;
  }

  return data;
}

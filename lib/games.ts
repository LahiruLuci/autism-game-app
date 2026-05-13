import { supabase } from "./supabase";
import { getLatestAssessmentForCurrentParent } from "./survey";
import { isGameUnlocked } from "./game-unlock";
import { Game, GameWithUnlockState } from "@/types/game";

export async function getActiveGames() {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("is_active", true)
    .order("area", { ascending: true })
    .order("level", { ascending: true });

  if (error) {
    console.error("[BrightPath] Error fetching games:", error);
    return [];
  }

  console.log("[BrightPath] Active games fetched from DB:", data);
  return data as Game[];
}

export async function getGamesForChild(childId: string) {
  // 1. Fetch latest assessment (handles child ownership internally)
  const assessment = await getLatestAssessmentForCurrentParent(childId).catch(() => null);

  // 2. Fetch all active games
  const games = await getActiveGames();

  // 3. Apply unlock logic
  const gamesWithStatus: GameWithUnlockState[] = games.map((game) => {
    const { isUnlocked, message } = isGameUnlocked(game, assessment);
    return {
      ...game,
      is_unlocked: isUnlocked,
      unlock_message: message,
    };
  });

  return {
    games: gamesWithStatus,
    assessment,
  };
}

export async function getGameBySlugAndLevel(gameSlug: string, level: number) {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("game_slug", gameSlug)
    .eq("level", level)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("[BrightPath] Error fetching single game:", error);
    return null;
  }

  return data as Game;
}

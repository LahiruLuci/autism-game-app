export type GameArea =
  | "emotion"
  | "cognitive"
  | "self_awareness"
  | "mathematical";

export interface Game {
  id: string;
  area: GameArea;
  game_slug: string;
  game_name: string;
  description: string;
  level: number;
  is_active: boolean;
  created_at: string;
}

export interface GameWithUnlockState extends Game {
  is_unlocked: boolean;
  unlock_message?: string;
}

export interface GameScore {
  id: string;
  child_id: string;
  game_id: string;
  area: GameArea;
  level: number;
  correct_answers: number;
  wrong_answers: number;
  attempts: number;
  time_taken: number;
  final_score: number;
  played_at: string;
}

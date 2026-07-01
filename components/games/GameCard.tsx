import Link from "next/link";
import { GameWithUnlockState } from "@/types/game";
import { getGameHref } from "@/lib/game-routes";

type GameCardProps = {
  childId: string;
  game: GameWithUnlockState;
};

export function GameCard({ childId, game }: GameCardProps) {
  const isUnlocked = game.is_unlocked;

  return (
    <div className={`relative flex flex-col h-full rounded-3xl border transition-all duration-300 ${
      isUnlocked 
        ? "bg-white border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1" 
        : "bg-slate-50 border-slate-200 opacity-80"
    }`}>
      {/* Level Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
        isUnlocked ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-500"
      }`}>
        Level {game.level}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className={`font-display text-lg font-bold mb-2 ${isUnlocked ? "text-slate-900" : "text-slate-500"}`}>
          {game.game_name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">
          {game.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          {!isUnlocked && (
            <div className="flex items-center gap-1.5 text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">{game.unlock_message || "Locked"}</span>
            </div>
          )}

          {isUnlocked ? (
            <Link
              href={getGameHref(childId, game.game_slug, game.level)}
              className="inline-flex items-center justify-center w-full py-3 rounded-2xl bg-blue-500 text-white text-xs font-extrabold hover:bg-blue-600 transition-colors shadow-sm shadow-blue-100"
            >
              Start Game
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex items-center justify-center w-full py-3 rounded-2xl bg-slate-200 text-slate-400 text-xs font-extrabold cursor-not-allowed"
            >
              Locked
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

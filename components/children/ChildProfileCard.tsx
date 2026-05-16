import Link from "next/link";
import type { ChildProfile } from "@/types/child";
import type { LatestAssessment } from "@/lib/children";

type ChildProfileCardProps = {
  child: ChildProfile;
  assessment: LatestAssessment | null;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-violet-100 text-violet-600",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
  "bg-teal-100 text-teal-600",
];

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export function ChildProfileCard({ child, assessment }: ChildProfileCardProps) {
  const hasAssessment = !!assessment;
  const avatarColor = getAvatarColor(child.child_name);
  const initial = child.child_name.charAt(0).toUpperCase();

  const levelLabel = hasAssessment && assessment?.predicted_level
    ? `Level ${assessment.predicted_level}`
    : null;

  return (
    <article className="group rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col gap-5">
      {/* Clickable Area: Avatar + Name + Grid */}
      <Link href={`/children/${child.id}`} className="block space-y-5 cursor-pointer">
        {/* Top: Avatar + Name + Age */}
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${avatarColor} flex items-center justify-center font-display text-2xl font-bold flex-shrink-0 shadow-inner transition-transform duration-300 group-hover:scale-105`}>
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-bold text-slate-900 truncate transition-colors group-hover:text-blue-600">{child.child_name}</h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Added {formatDate(child.created_at)}</p>
          </div>
          <span className="flex-shrink-0 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            Age {child.age}
          </span>
        </div>

        {/* Middle: Info grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Gender</span>
            <span className="text-sm font-bold text-slate-700">{child.gender || "Not specified"}</span>
          </div>
          <div className={`rounded-2xl px-4 py-3 ${hasAssessment ? "bg-green-50" : "bg-amber-50"}`}>
            <span className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${hasAssessment ? "text-green-600" : "text-amber-600"}`}>Survey</span>
            <span className="text-sm font-bold text-slate-700">{hasAssessment ? "Completed ✓" : "Pending"}</span>
          </div>
          {levelLabel && (
            <div className="rounded-2xl bg-violet-50 px-4 py-3">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-violet-500 mb-1">Support Level</span>
              <span className="text-sm font-bold text-slate-700">{levelLabel}</span>
            </div>
          )}
          <div className="rounded-2xl bg-blue-50 px-4 py-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-1">Next Step</span>
            <span className="text-sm font-bold text-slate-700">{hasAssessment ? "Play Games" : "Take Survey"}</span>
          </div>
        </div>
      </Link>

      {/* Bottom: Action buttons */}
      <div className="flex flex-col gap-2">
        <Link
          href={hasAssessment ? `/games/${child.id}` : `/survey/${child.id}`}
          className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-extrabold shadow-sm transition-all duration-300 active:scale-95 ${
            hasAssessment
              ? "bg-green-500 text-white hover:bg-green-600 hover:shadow-md hover:-translate-y-0.5"
              : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md hover:-translate-y-0.5"
          }`}
        >
          {hasAssessment ? (
            <>
              Continue Games
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </>
          ) : (
            <>
              Start Survey
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </Link>
        
        {hasAssessment && (
          <Link
            href={`/children/${child.id}/dashboard`}
            className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-extrabold shadow-sm transition-all duration-300 active:scale-95 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-100"
          >
            View Progress Dashboard
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}

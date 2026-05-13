import Link from "next/link";

type ChildActionPanelProps = {
  childId: string;
  hasAssessment: boolean;
};

export function ChildActionPanel({ childId, hasAssessment }: ChildActionPanelProps) {
  return (
    <div className="flex flex-col gap-3">
      {hasAssessment ? (
        <>
          <Link
            href={`/games/${childId}`}
            className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-blue-500 text-white text-sm font-extrabold shadow-lg shadow-blue-200 hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
            Continue to Games
          </Link>
          <Link
            href={`/survey/${childId}`}
            className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-extrabold shadow-sm hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retake Survey
          </Link>
        </>
      ) : (
        <Link
          href={`/survey/${childId}`}
          className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-blue-500 text-white text-sm font-extrabold shadow-lg shadow-blue-200 hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Start Survey
        </Link>
      )}
      <Link
        href="/children"
        className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-all duration-300"
      >
        Back to Children
      </Link>
    </div>
  );
}

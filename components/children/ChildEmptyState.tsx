import Link from "next/link";

export function ChildEmptyState() {
  return (
    <div className="rounded-[2rem] border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/60 to-violet-50/60 p-12 sm:p-16 text-center flex flex-col items-center gap-6">
      {/* Illustration icon */}
      <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center text-blue-400 shadow-inner">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>

      <div>
        <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">No child profiles yet</h2>
        <p className="text-base text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
          Add a child profile to begin the survey and unlock supportive learning games tailored just for them.
        </p>
      </div>

      <Link
        href="/children/new"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-500 text-white text-sm font-extrabold shadow-sm hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        Add Child Profile
      </Link>
    </div>
  );
}

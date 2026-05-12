import Link from "next/link";

type WelcomeParentHeroProps = {
  parentName: string;
};

export function WelcomeParentHero({ parentName }: WelcomeParentHeroProps) {
  const firstName = parentName?.split(" ")[0] || "there";

  return (
    <div className="relative rounded-[2rem] bg-gradient-to-br from-blue-50 via-white to-violet-50 border border-blue-100 shadow-sm overflow-hidden p-8 sm:p-12">
      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-violet-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-6 right-24 w-24 h-24 rounded-full bg-teal-200/25 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left: Text */}
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-bold uppercase tracking-widest text-blue-500 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Parent Area
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
              {firstName}
            </span>{" "}
            👋
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
            Choose a child profile, continue the survey, or start supportive learning games.
          </p>
        </div>

        {/* Right: Action */}
        <div className="flex-shrink-0 w-full lg:w-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-100 p-6 shadow-sm flex flex-col items-center text-center gap-4">
            {/* Decorative icon */}
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 shadow-inner">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">Add a new profile</p>
              <p className="text-xs text-slate-400 font-medium">for another child</p>
            </div>
            <Link
              href="/children/new"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-500 text-white text-sm font-extrabold shadow-sm hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Child Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

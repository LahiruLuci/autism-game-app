export function ChildrenPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero skeleton */}
      <div className="rounded-[2rem] bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 p-8 sm:p-12 h-48" />

      {/* Next action skeleton */}
      <div className="rounded-[2rem] bg-slate-100 h-24" />

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-3xl bg-slate-100 h-24" />
        ))}
      </div>

      {/* Cards skeleton */}
      <div>
        <div className="h-6 w-36 bg-slate-200 rounded-xl mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-[2rem] bg-slate-100 h-64" />
          ))}
        </div>
      </div>
    </div>
  );
}

type QuickStatusCardsProps = {
  childCount: number;
  surveysCompleted: number;
  gamesPlayed: number;
};

type StatCardProps = {
  value: number;
  label: string;
  icon: React.ReactNode;
  bgClass: string;
  iconBg: string;
};

function StatCard({ value, label, icon, bgClass, iconBg }: StatCardProps) {
  return (
    <div className={`rounded-3xl ${bgClass} border p-6 flex items-center gap-5`}>
      <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0 shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="font-display text-3xl font-bold text-slate-900">{value}</p>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export function QuickStatusCards({ childCount, surveysCompleted, gamesPlayed }: QuickStatusCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        value={childCount}
        label="Child Profiles"
        bgClass="bg-blue-50/60 border-blue-100"
        iconBg="bg-blue-100 text-blue-500"
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        }
      />
      <StatCard
        value={surveysCompleted}
        label="Surveys Completed"
        bgClass="bg-violet-50/60 border-violet-100"
        iconBg="bg-violet-100 text-violet-500"
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        }
      />
      <StatCard
        value={gamesPlayed}
        label="Games Played"
        bgClass="bg-green-50/60 border-green-100"
        iconBg="bg-green-100 text-green-600"
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  );
}

type RecentActivityProps = {
  children: Array<{ child_name: string; created_at: string }>;
  surveysCompleted: number;
  gamesPlayed: number;
};

function formatTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(dateStr));
}

export function RecentActivity({ children, surveysCompleted, gamesPlayed }: RecentActivityProps) {
  const items: Array<{ icon: string; text: string; time: string; color: string }> = [];

  children.forEach((c) => {
    items.push({
      icon: "👤",
      text: `Child profile added: ${c.child_name}`,
      time: formatTimeAgo(c.created_at),
      color: "bg-blue-100",
    });
  });

  if (surveysCompleted > 0) {
    items.push({
      icon: "📋",
      text: `${surveysCompleted} survey${surveysCompleted > 1 ? "s" : ""} completed`,
      time: "Recently",
      color: "bg-violet-100",
    });
  }

  if (gamesPlayed > 0) {
    items.push({
      icon: "🎮",
      text: `${gamesPlayed} game session${gamesPlayed > 1 ? "s" : ""} completed`,
      time: "Recently",
      color: "bg-green-100",
    });
  }

  return (
    <div className="rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
      <h2 className="font-display text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500 text-sm">📅</span>
        Recent Activity
      </h2>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300 text-xl mx-auto mb-4">🌱</div>
          <p className="text-sm font-semibold text-slate-400">No activity yet.</p>
          <p className="text-xs text-slate-300 mt-1">Start by adding a child profile or completing a survey.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center text-base`}>
                  {item.icon}
                </div>
                {i < items.length - 1 && (
                  <div className="w-0.5 h-4 bg-slate-100 mt-1" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">{item.text}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

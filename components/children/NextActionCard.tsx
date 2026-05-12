import Link from "next/link";
import type { ChildProfile } from "@/types/child";
import type { LatestAssessment } from "@/lib/children";

type NextActionCardProps = {
  children: ChildProfile[];
  assessments: Record<string, LatestAssessment | null>;
};

export function NextActionCard({ children, assessments }: NextActionCardProps) {
  // Determine next action
  let icon = (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
    </svg>
  );
  let title = "Add your first child profile";
  let description = "Create a profile to begin the support survey and unlock suitable learning activities.";
  let buttonText = "Add Child Profile";
  let buttonHref = "/children/new";
  let colorClass = "from-blue-50 to-blue-100/50 border-blue-200";
  let iconBg = "bg-blue-100 text-blue-500";

  if (children.length > 0) {
    const firstChild = children[0];
    const assessment = assessments[firstChild.id];

    if (!assessment) {
      icon = (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      );
      title = `Start survey for ${firstChild.child_name}`;
      description = "Complete the simple survey so we can suggest the right level of supportive activities.";
      buttonText = "Start Survey";
      buttonHref = `/survey/${firstChild.id}`;
      colorClass = "from-violet-50 to-violet-100/50 border-violet-200";
      iconBg = "bg-violet-100 text-violet-500";
    } else {
      icon = (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      title = `Continue games for ${firstChild.child_name}`;
      description = `${firstChild.child_name} has recommended activities ready. Jump into the learning games!`;
      buttonText = "Continue Games";
      buttonHref = `/games/${firstChild.id}`;
      colorClass = "from-green-50 to-green-100/50 border-green-200";
      iconBg = "bg-green-100 text-green-600";
    }
  }

  return (
    <div className={`rounded-[2rem] bg-gradient-to-br ${colorClass} border p-6 sm:p-8`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shadow-inner`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Suggested Next Step</p>
          <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-1">{title}</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">{description}</p>
        </div>
        <div className="w-full sm:w-auto flex-shrink-0">
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 text-white text-sm font-extrabold shadow-sm hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 active:scale-95 whitespace-nowrap"
          >
            {buttonText}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

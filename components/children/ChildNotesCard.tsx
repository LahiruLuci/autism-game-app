type ChildNotesCardProps = {
  notes: string | null;
};

export function ChildNotesCard({ notes }: ChildNotesCardProps) {
  return (
    <div className="rounded-[2rem] bg-slate-100/50 border border-slate-200/50 p-8 shadow-sm">
      <h2 className="font-display text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm">📝</span>
        Notes
      </h2>
      <p className="text-slate-600 font-medium leading-relaxed">
        {notes || "No notes added yet."}
      </p>
    </div>
  );
}

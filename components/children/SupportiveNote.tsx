export function SupportiveNote() {
  return (
    <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5 flex items-start gap-4">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500 text-base shadow-inner">
        💛
      </div>
      <p className="text-sm font-medium text-amber-800 leading-relaxed">
        <strong className="font-bold">Note: </strong>
        BrightPath supports learning and progress tracking through simple activities. It is not a medical diagnosis tool.
      </p>
    </div>
  );
}

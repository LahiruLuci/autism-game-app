type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-primary-blue" />
      <span>{message}</span>
    </div>
  );
}

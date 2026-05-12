import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ className, id, label, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <input
        id={inputId}
        className={clsx(
          "min-h-12 w-full rounded-2xl border border-border-soft bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-primary-blue focus:ring-4 focus:ring-blue-100",
          "placeholder:text-slate-400",
          className,
        )}
        {...props}
      />
    </label>
  );
}

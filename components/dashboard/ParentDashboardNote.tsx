"use client";

import { Info } from "lucide-react";

export function ParentDashboardNote() {
  return (
    <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 flex items-start gap-3">
      <Info size={20} className="text-sky-500 shrink-0 mt-0.5" />
      <p className="text-sm font-medium text-sky-800 leading-relaxed">
        BrightPath tracks learning activity progress and supports gentle practice. This dashboard provides learning insights to help guide your child, but it is not a medical diagnosis report.
      </p>
    </div>
  );
}

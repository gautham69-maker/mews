import React from "react";
export function ProvenanceChip({label, value}:{label:string; value:string}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 text-xs">
      <span className="font-medium">{label}</span>
      <span className="opacity-80">•</span>
      <span>{value}</span>
    </span>
  );
}

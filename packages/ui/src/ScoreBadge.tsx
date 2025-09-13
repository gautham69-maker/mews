import React from "react";

export const ScoreBadge: React.FC<{ score?: number; size?: "sm"|"md"|"lg" }> = ({ score=0, size="md" }) => {
  const color = score >= 8 ? "bg-emerald-600" : score >= 5 ? "bg-amber-500" : "bg-rose-600";
  const px = size==="lg" ? "px-3 py-1.5 text-lg" : size==="sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  return (
    <span className={`inline-flex items-center rounded-full text-white ${color} ${px}`}>
      Risk Score: <b className="ml-1">{score.toFixed(1)}</b>/10
    </span>
  );
};

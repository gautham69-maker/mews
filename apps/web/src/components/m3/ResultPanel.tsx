"use client";

import Link from "next/link";
import { Parcel } from "../../types/parcel";

function statusPill(s: Parcel["status"]) {
  const c = s === "APPROVED" ? "bg-green-100 text-green-800"
        : s === "PENDING" ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";
  return <span className={`px-2 py-1 rounded-full text-xs ${c}`}>{s}</span>;
}

export default function ResultPanel({
  items,
  onHover,
  onSelect,
  selectedId,
}: {
  items: Parcel[];
  onHover?: (id: string|null) => void;
  onSelect?: (id: string) => void;
  selectedId?: string | null;
}) {
  return (
    <div className="w-full md:w-96 border-l bg-white h-[70vh] overflow-y-auto">
      <div className="px-4 py-2 border-b bg-gray-50 sticky top-0">
        <div className="font-semibold">Results</div>
        <div className="text-xs text-gray-500">Overview (score badge), quick facts, tabs</div>
      </div>
      <ul>
        {items.map(p => (
          <li key={p.id}
              onMouseEnter={()=>onHover?.(p.id)}
              onMouseLeave={()=>onHover?.(null)}
              className={`p-4 border-b cursor-pointer ${selectedId===p.id ? "bg-indigo-50" : "bg-white"}`}
              onClick={()=>onSelect?.(p.id)}>
            <div className="flex items-center justify-between">
              <div className="font-medium">{p.layout_name}</div>
              <span title="match score" className="text-[11px] px-2 py-0.5 rounded bg-gray-100">{p.score ?? 0}</span>
            </div>
            <div className="text-xs text-gray-600">
              <div>{statusPill(p.status)} • {p.village}, {p.mandal}</div>
              <div>Survey: <span className="font-mono">{p.survey_no}</span> • Area: {p.area_sqyd} sq.yd</div>
            </div>
            {p.quick_facts && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {Object.entries(p.quick_facts).map(([k,v]) => (
                  <div key={k} className="rounded border p-2 text-center">
                    <div className="text-[10px] uppercase text-gray-500">{k}</div>
                    <div className="text-sm font-semibold">{String(v)}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3 flex gap-2 text-sm">
              <Link className="underline" href={`/m3/parcel/${p.id}`}>Details</Link>
              <span className="text-gray-400">|</span>
              <Link className="underline" href={`/m3/search?focus=${p.id}`}>Focus on map</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

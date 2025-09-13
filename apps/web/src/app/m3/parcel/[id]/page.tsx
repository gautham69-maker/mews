"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { PARCELS } from "../../../src/data/parcel";


export default function ParcelDetails() {
  const { id } = useParams<{id:string}>();
  const p = PARCELS.find(x => x.id === id);

  if (!p) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <div className="text-red-600">Parcel not found</div>
        <Link className="underline" href="/m3/search">Back</Link>
      </main>
    );
  }

  const tabs = ["Overview", "Quick Facts", "Documents"] as const;
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-4">
      <Link className="underline text-sm" href="/m3/search">← Back to results</Link>
      <div className="rounded-2xl border p-6 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{p.layout_name}</h1>
          <span className="px-3 py-1 rounded-full text-xs border">{p.status}</span>
        </div>
        <div className="text-sm text-gray-600">
          ID: <span className="font-mono">{p.id}</span> • Survey {p.survey_no} • {p.village}, {p.mandal}
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex gap-3 text-sm">
            {tabs.map(t => (
              <button key={t} className="px-3 py-1 rounded-lg border bg-gray-50">{t}</button>
            ))}
          </div>
          <div className="mt-4 text-sm">
            <p><strong>Area:</strong> {p.area_sqyd} sq.yd</p>
            {p.owner && <p><strong>Owner:</strong> {p.owner}</p>}
            {p.quick_facts && (
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(p.quick_facts).map(([k,v]) => (
                  <div key={k} className="rounded border p-3">
                    <div className="text-[11px] uppercase text-gray-500">{k}</div>
                    <div className="text-base font-semibold">{String(v)}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-4 text-xs text-gray-500">
              (Spec-only) Future: show approval docs, court cases list, and a mini-map of this polygon.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

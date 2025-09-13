"use client";
import * as React from "react";
import { useParcelsStore } from "../lib/useParcelsStore";
import { getParcel } from "../lib/api";
import type { ParcelDetailsResponse } from "@satya/types";
import { ScoreBadge } from "@satya/ui";

export default function ResultPanel() {
  const { selected } = useParcelsStore();
  const [details, setDetails] = React.useState<ParcelDetailsResponse | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!selected) return setDetails(null);
    setLoading(true);
    getParcel(selected.id)
      .then(setDetails)
      .finally(() => setLoading(false));
  }, [selected?.id]);

  if (!selected)
    return (
      <div className="p-6 text-slate-600">
        Select a parcel to view details
      </div>
    );

  return (
    <div className="h-full overflow-auto border-l border-slate-200 bg-white">
      <div className="p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {selected.facts.layout_name || "Parcel"}
          </h2>
          <p className="text-sm text-slate-600">
            Survey: {selected.facts.survey_no} •{" "}
            {selected.facts.village}, {selected.facts.district}
          </p>
        </div>
        <ScoreBadge score={selected.score?.total ?? 0} />
      </div>

      <div className="px-4 pb-4 space-y-4">
        <section className="rounded-lg border p-4">
          <h3 className="text-sm font-semibold mb-2">Quick facts</h3>
          <ul className="text-sm text-slate-700 space-y-1">
            <li><b>Survey:</b> {selected.facts.survey_no}</li>
            {selected.facts.layout_name && <li><b>Layout:</b> {selected.facts.layout_name}</li>}
            {selected.facts.door_no && <li><b>Door No:</b> {selected.facts.door_no}</li>}
            <li>
              <b>Location:</b> {selected.facts.village}, {selected.facts.mandal},{" "}
              {selected.facts.district}
            </li>
          </ul>
        </section>

        <section className="rounded-lg border p-4">
          <h3 className="text-sm font-semibold mb-2">Tabs</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <button className="rounded-md border px-3 py-1">Overview</button>
            <button className="rounded-md border px-3 py-1">Ownership</button>
            <button className="rounded-md border px-3 py-1">Approvals</button>
            <button className="rounded-md border px-3 py-1">Zoning/Buffer</button>
            <button className="rounded-md border px-3 py-1">Litigation</button>
            <button className="rounded-md border px-3 py-1">Documents</button>
          </div>

          {loading && <p className="mt-3 text-xs text-slate-500">Loading…</p>}

          {details && (
            <div className="mt-3 text-xs text-slate-600">
              <p className="font-medium mb-1">Provenance:</p>
              <ul className="list-disc ml-5 space-y-1">
                {details.provenance?.map((p) => (
                  <li key={p.fact}>
                    {p.fact} — <i>{p.source}</i> ({p.date})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

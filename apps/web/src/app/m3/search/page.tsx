"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "../../src/components/m3/SearchBar";
import { resolveParcels } from "../../src/lib/resolve";
import ParcelMap from "../../src/components/m3/ParcelMap";
import ResultPanel from "../../src/components/m3/ResultPanel";

export default function SearchPage() {
  const sp = useSearchParams();
  const r = useRouter();

  const input = useMemo(() => ({
    q: sp.get("q") ?? undefined,
    survey_no: sp.get("survey_no") ?? undefined,
    layout_name: sp.get("layout_name") ?? undefined,
    door_no: sp.get("door_no") ?? undefined,
    coords: sp.get("coords") ?? undefined,
  }), [sp]);

  const preFocus = sp.get("focus") ?? null;

  const items = useMemo(() => resolveParcels(input), [input]);
  const [hoverId, setHoverId] = useState<string|null>(null);
  const [selectedId, setSelectedId] = useState<string|null>(preFocus);

  useEffect(()=>{ if (preFocus) setSelectedId(preFocus); }, [preFocus]);

  function onSelect(id: string) {
    setSelectedId(id);
    // keep query but set focus param
    const params = new URLSearchParams(sp as any);
    params.set("focus", id);
    history.replaceState(null, "", `?${params.toString()}`);
  }

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Search</h1>
      <SearchBar />
      <div className="rounded-2xl border bg-gray-50 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <ParcelMap
            items={items}
            hoverId={hoverId}
            selectedId={selectedId}
            onHover={setHoverId}
            onSelect={onSelect}
          />
          <ResultPanel
            items={items}
            onHover={setHoverId}
            onSelect={onSelect}
            selectedId={selectedId}
          />
        </div>
      </div>
    </main>
  );
}

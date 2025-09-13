"use client";

import * as React from "react";
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

import ResultPanel from "../components/ResultPanel";
import { useParcelsStore } from "../lib/useParcelsStore";
import { searchParcels } from "../lib/api";

export default function HomeClient() {
  const { setItems } = useParcelsStore();
  const [q, setQ] = React.useState("");

  const runSearch = async () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    const res = await searchParcels(params);
    setItems(res.items);
  };

  React.useEffect(() => { runSearch(); }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 items-center">
          <div className="font-bold text-lg">SATYA Portal</div>
          <div className="flex-1" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Survey No / Layout / Door No / Location"
            className="w-[420px] rounded-md border px-3 py-2"
          />
          <button
            onClick={runSearch}
            className="rounded-md bg-emerald-600 text-white px-4 py-2"
          >
            Search
          </button>
        </div>
      </header>

      <main className="flex flex-1">
        <div className="flex-1"><MapView /></div>
        <div className="w-[380px]"><ResultPanel /></div>
      </main>
    </div>
  );
}

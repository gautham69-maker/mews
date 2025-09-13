"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const r = useRouter();
  const [q, setQ] = useState("");
  const [survey, setSurvey] = useState("");
  const [layout, setLayout] = useState("");
  const [door, setDoor] = useState("");
  const [coords, setCoords] = useState("");

  function go() {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (survey) params.set("survey_no", survey);
    if (layout) params.set("layout_name", layout);
    if (door) params.set("door_no", door);
    if (coords) params.set("coords", coords);
    r.push(`/m3/search?${params.toString()}`);
  }

  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <input className="border rounded-md px-3 py-2" placeholder="Free text (fuzzy)"
               value={q} onChange={e=>setQ(e.target.value)} />
        <input className="border rounded-md px-3 py-2" placeholder="Survey No (e.g., 123/4A)"
               value={survey} onChange={e=>setSurvey(e.target.value)} />
        <input className="border rounded-md px-3 py-2" placeholder="Layout Name"
               value={layout} onChange={e=>setLayout(e.target.value)} />
        <input className="border rounded-md px-3 py-2" placeholder="Door No"
               value={door} onChange={e=>setDoor(e.target.value)} />
        <input className="border rounded-md px-3 py-2" placeholder="Coords lat,lng"
               value={coords} onChange={e=>setCoords(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <button onClick={go} className="px-4 py-2 rounded-lg bg-black text-white">Search</button>
        <span className="text-sm text-gray-600">Keys supported: survey_no, layout_name, door_no, coordinates, free-text.</span>
      </div>
    </div>
  );
}

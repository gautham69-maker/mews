"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Parcel } from "../../types/parcel";
import { bboxOfParcels, bboxOfParcel, BBox } from "../../lib/bbox";
import { svgProject } from "../../lib/geo";

const PAD = 0.0008; // bbox padding

function padBBox(b: BBox, pad = PAD): BBox {
  return { minLat: b.minLat - pad, minLng: b.minLng - pad, maxLat: b.maxLat + pad, maxLng: b.maxLng + pad };
}

export default function ParcelMap({
  items,
  hoverId,
  selectedId,
  onHover,
  onSelect,
}: {
  items: Parcel[];
  hoverId?: string | null;
  selectedId?: string | null;
  onHover?: (id: string|null)=>void;
  onSelect?: (id: string)=>void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });

  useEffect(() => {
    function measure() {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(300, r.width), h: Math.max(300, r.height) });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const baseBBox = useMemo(() => padBBox(bboxOfParcels(items)), [items]);

  const activeBBox = useMemo(() => {
    if (!selectedId) return baseBBox;
    const sel = items.find(p => p.id === selectedId);
    if (!sel) return baseBBox;
    return padBBox(bboxOfParcel(sel), PAD);
  }, [selectedId, items, baseBBox]);

  return (
    <div ref={containerRef} className="flex-1 h-[70vh] bg-white border relative">
      <svg viewBox={`0 0 ${size.w} ${size.h}`} width="100%" height="100%" role="img" aria-label="Parcel Map">
        {/* polygons */}
        {items.map(p => {
          const pts = p.polygon.map(pt => svgProject(pt.lat, pt.lng, activeBBox, size.w, size.h));
          const d = pts.map((pt, i) => `${i===0 ? "M": "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`).join(" ") + " Z";
          const isHover = hoverId === p.id;
          const isSel = selectedId === p.id;

          const fill =
            p.status === "APPROVED" ? "#22c55e55" :
            p.status === "PENDING" ? "#eab30855" : "#ef444455";

          const stroke = isSel ? "#4f46e5" : isHover ? "#111827" : "#374151";
          const strokeWidth = isSel ? 3 : isHover ? 2 : 1;

          return (
            <path key={p.id} d={d}
              onMouseEnter={()=>onHover?.(p.id)}
              onMouseLeave={()=>onHover?.(null)}
              onClick={()=>onSelect?.(p.id)}
              style={{ transition: "all 180ms ease" }}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          );
        })}
      </svg>

      {/* hover summary card */}
      {hoverId && (() => {
        const p = items.find(i => i.id === hoverId)!;
        return (
          <div className="absolute left-2 bottom-2 bg-white/95 border rounded-lg p-3 shadow text-sm">
            <div className="font-medium">{p.layout_name}</div>
            <div className="text-xs text-gray-600">Survey {p.survey_no} • {p.village}, {p.mandal}</div>
            <div className="text-xs">Status: {p.status}</div>
          </div>
        );
      })()}
    </div>
  );
}

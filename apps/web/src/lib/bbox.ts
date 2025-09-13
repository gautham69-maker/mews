import { Parcel } from "../types/parcel";

export type BBox = { minLat: number; minLng: number; maxLat: number; maxLng: number };

export function bboxOfParcel(p: Parcel): BBox {
  const lats = p.polygon.map(pt => pt.lat);
  const lngs = p.polygon.map(pt => pt.lng);
  return {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
  };
}

export function bboxOfParcels(ps: Parcel[]): BBox {
  const allLats = ps.flatMap(p => p.polygon.map(pt => pt.lat));
  const allLngs = ps.flatMap(p => p.polygon.map(pt => pt.lng));
  return {
    minLat: Math.min(...allLats),
    maxLat: Math.max(...allLats),
    minLng: Math.min(...allLngs),
    maxLng: Math.max(...allLngs),
  };
}

import { PARCELS } from "../data/parcel";
import { fuzzyScore } from "./fuzzy";
import { Parcel } from "../types/parcel";

export type SearchInput = {
  q?: string;
  survey_no?: string;
  layout_name?: string;
  door_no?: string;
  coords?: string; // "lat,lng"
};

function parseCoords(s?: string): {lat:number; lng:number} | null {
  if (!s) return null;
  const [a,b] = s.split(",").map(t => parseFloat(t.trim()));
  if (isFinite(a) && isFinite(b)) return { lat: a, lng: b };
  return null;
}

export function resolveParcels(input: SearchInput): Parcel[] {
  const { q, survey_no, layout_name, door_no } = input;
  const coord = parseCoords(input.coords);

  const results: Parcel[] = PARCELS.map(p => {
    let score = 0;

    // direct keys
    if (survey_no) score += p.survey_no === survey_no ? 60 : fuzzyScore(survey_no, p.survey_no);
    if (layout_name) score += fuzzyScore(layout_name, p.layout_name);
    if (door_no) score += p.door_no ? fuzzyScore(door_no, p.door_no) : 0;

    // free text hits across multiple fields
    if (q) {
      const hay = [
        p.layout_name, p.survey_no, p.door_no ?? "", p.village, p.mandal, p.status, p.id
      ].join(" ");
      score += fuzzyScore(q, hay);
    }

    // coordinate proximity (very rough)
    if (coord) {
      const dLat = Math.abs(coord.lat - p.centroid.lat);
      const dLng = Math.abs(coord.lng - p.centroid.lng);
      const manhattan = dLat + dLng;
      score += Math.max(0, 80 - manhattan * 500); // tiny boxes -> big score if near
    }

    return { ...p, score };
  });

  // filter weak matches unless explicit keys present
  const hardKeys = survey_no || layout_name || door_no || coord;
  const filtered = results
    .filter(p => hardKeys ? p.score > 0 : p.score >= 40)
    .sort((a,b) => (b.score ?? 0) - (a.score ?? 0));

  return filtered.slice(0, 25);
}

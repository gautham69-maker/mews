// packages/types/src/index.ts
export type ParcelId = string;

export interface ParcelQuickFacts {
  survey_no: string;
  layout_name?: string;
  door_no?: string;
  village?: string;
  mandal?: string;
  district?: string;
  state?: string;
}

export interface ParcelScore {
  total: number; // 0-10
  ownership?: number;
  approvals?: number;
  zoning?: number;
  encumbrance?: number;
  litigation?: number;
  onground?: number;
}

export interface ParcelFeature {
  id: ParcelId;
  facts: ParcelQuickFacts;
  score?: ParcelScore;
  bbox?: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
  centroid: [number, number]; // [lng, lat]
  // GeoJSON polygon (WGS84)
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

export interface SearchRequest {
  q?: string;
  survey_no?: string;
  layout_name?: string;
  door_no?: string;
  near?: { lng: number; lat: number; radius_m: number };
}

export interface SearchResponse {
  items: ParcelFeature[];
}

export interface ParcelDetailsResponse extends ParcelFeature {
  // tabs will use these later
  documents?: Array<{ id: string; title: string; access: "public"|"fee"|"confidential" }>;
  provenance?: Array<{ fact: string; source: string; date: string }>;
}

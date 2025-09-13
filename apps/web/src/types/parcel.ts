export type Parcel = {
  id: string;
  layout_name: string;
  survey_no: string;
  door_no?: string;
  village: string;
  mandal: string;
  status: "APPROVED" | "PENDING" | "UNAUTHORISED";
  centroid: { lat: number; lng: number };
  polygon: Array<{ lat: number; lng: number }>; // simple polygon (no holes) for spec demo
  area_sqyd: number;
  owner?: string;
  score?: number; // search score (higher = better)
  quick_facts?: Record<string, string | number>;
};

import type { SearchResponse, ParcelDetailsResponse } from "@satya/types";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:3001";
export async function searchParcels(params: URLSearchParams): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/parcels/search?${params.toString()}`, { method: "GET" });
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}
export async function getParcel(id: string): Promise<ParcelDetailsResponse> {
  const res = await fetch(`${API_BASE}/parcels/${id}`, { method: "GET" });
  if (!res.ok) throw new Error(`Parcel fetch failed: ${res.status}`);
  return res.json();
}

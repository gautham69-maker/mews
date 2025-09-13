import type { BBox } from "./bbox";

export function svgProject(lat: number, lng: number, view: BBox, width: number, height: number) {
  // linear mapping (not true web-mercator; good enough for spec UX)
  const x = ((lng - view.minLng) / (view.maxLng - view.minLng)) * width;
  const y = height - ((lat - view.minLat) / (view.maxLat - view.minLat)) * height;
  return { x, y };
}

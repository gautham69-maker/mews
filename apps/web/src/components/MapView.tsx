"use client";
import * as React from "react";
import Map, { Layer, Source, MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ParcelFeature } from "@satya/types";
import { useParcelsStore } from "../lib/useParcelsStore";

const styleUrl = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";



export default function MapView() {
  const { items, selected, select } = useParcelsStore();
  const [hoverId, setHoverId] = React.useState<string | undefined>();
console.log("items", items); // inside MapView before geojson useMemo

  // Build a GeoJSON from the items in store
  const geojson = React.useMemo(
    () => ({
      type: "FeatureCollection",
      features: items.map((p: ParcelFeature) => ({
        type: "Feature",
        properties: { id: p.id },
        geometry: p.geometry,
      })),
    }),
    [items]
  );

  // Center the map roughly to first item (fallback default)
  const first = items[0];
  const initialViewState = React.useMemo(
    () => ({
      longitude: first?.centroid?.[0] ?? 80.0,
      latitude: first?.centroid?.[1] ?? 12.9,
      zoom: first ? 12 : 10,
    }),
    [first]
  );

  const onClick = (e: MapLayerMouseEvent) => {
    const f = e.features?.[0];
    if (f?.properties?.id) select(String(f.properties.id));
  };

  return (
    <Map
      mapStyle={styleUrl}
      initialViewState={initialViewState}
      style={{ width: "100%", height: "100%" }}
      interactiveLayerIds={["parcels-fill"]}
      onMouseMove={(e) => {
        const f = e.features?.[0];
        setHoverId(f?.properties?.id ? String(f.properties.id) : undefined);
      }}
      onClick={onClick}
    >
      <Source id="parcels" type="geojson" data={geojson}>
        <Layer
          id="parcels-fill"
          type="fill"
          paint={{
            "fill-color": [
              "case",
              ["==", ["get", "id"], hoverId || ""],
              "#FFB020", // hover amber
              "#20B26C", // normal green
            ],
            "fill-opacity": 0.35,
          }}
        />
        <Layer
          id="parcels-outline"
          type="line"
          paint={{
            "line-color": [
              "case",
              ["==", ["get", "id"], selected?.id || ""],
              "#1C3D73", // selected blue
              "#0E1116", // normal dark
            ],
            "line-width": [
              "case",
              ["==", ["get", "id"], selected?.id || ""],
              3,
              1,
            ],
          }}
        />
      </Source>
    </Map>
  );
}

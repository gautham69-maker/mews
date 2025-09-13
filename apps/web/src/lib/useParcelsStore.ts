"use client";
import { create } from "zustand";
import type { ParcelFeature } from "@satya/types";

type State = {
  items: ParcelFeature[];
  selected?: ParcelFeature;
  setItems: (x: ParcelFeature[]) => void;
  select: (id: string) => void;
};

export const useParcelsStore = create<State>((set, get) => ({
  items: [],
  selected: undefined,
  setItems: (items) => set({ items }),
  select: (id) => {
    const found = get().items.find((i) => i.id === id);
    set({ selected: found });
  },
}));

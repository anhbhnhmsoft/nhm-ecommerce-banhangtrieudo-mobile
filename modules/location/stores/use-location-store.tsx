import { create } from "zustand";
import { AddressItem, LocationApp } from "../utils/type";

export interface ILocationStore {
  location: LocationApp | null;
  item_address: AddressItem | null;

  setLocation: (location: LocationApp | null) => void;
  setItemAddress: (address: AddressItem | null) => void;
}

export const useLocationStore = create<ILocationStore>((set) => ({
  location: null,

  item_address: null,

  setLocation: (location) => set({ location }),
  setItemAddress: (address) => set({ item_address: address }),
}));

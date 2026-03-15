import { LocationObject } from "expo-location";

export type LocationApp = {
  location: LocationObject;
  address: string;
};

export type SelectAddress = {
  address: string;
  latitude: string;
  longitude: string;
  desc: string;
};

export type AddressItem = {
  id: string;
  user_id: string;
  address: string;
  latitude: string;
  longitude: string;
  desc: string;
};

export type DetailLocation = {
  place_id: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
};

import { useGetLocation } from "@/modules/location/hooks";
import { useLocationStore } from "@/modules/location/stores";

export const usePayment = () => {
  const getLocation = useGetLocation();

  const location = useLocationStore((s) => s.location);

  return {
    getLocation,
    location,
  };
};

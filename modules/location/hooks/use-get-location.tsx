import * as Location from "expo-location";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useLocationStore } from "../stores";
import { formatLocation } from "../utils";

/**
 * Hook get vị trí hiện tại của người dùng (dùng để lấy vị trí khi người dùng click vào nút "Lấy vị trí hiện tại")
 * - Set vị trí vào store
 */
export const useGetLocation = () => {
  const setAppLocation = useLocationStore((s) => s.setLocation);
  const { t } = useTranslation();

  return async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          t("permission.location.title"),
          t("permission.location.message"),
        );
      }

      // Có quyền -> Lấy vị trí
      const newLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.High,
      });
      const location = await formatLocation(newLocation);
      setAppLocation(location);

      return location;
    } catch (error) {
      Alert.alert(
        t("permission.location.title"),
        t("permission.location.error"),
      );
      return null;
    }
  };
};

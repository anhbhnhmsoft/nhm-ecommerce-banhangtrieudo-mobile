import * as Location from "expo-location";
import { LocationApp } from "./type";

/**
 * format địa chỉ tọa độ
 * @param locationObject Vị trí người dùng
 */
export const formatLocation = async (
  locationObject: Location.LocationObject,
): Promise<LocationApp | null> => {
  try {
    const reversedGeoCodes = await Location.reverseGeocodeAsync({
      latitude: locationObject.coords.latitude,
      longitude: locationObject.coords.longitude,
    });
    if (reversedGeoCodes.length > 0) {
      const place = reversedGeoCodes[0];
      // Xử lý đường/số nhà: Gom Số nhà + Tên đường lại cho rõ ràng
      // Ví dụ: "123" + "Đường Láng"
      let streetInfo = place.street || place.name;
      if (place.streetNumber && place.street) {
        streetInfo = `${place.streetNumber} ${place.street}`;
      }
      // Tạo mảng các thành phần theo thứ tự hiển thị mong muốn
      const parts = [
        streetInfo, // Số nhà + Đường (hoặc tên địa điểm)
        place.district || place.subregion, // Quận/Huyện (iOS hay trả về subregion thay vì district)
        place.city || place.region, // Tỉnh/Thành phố (Android hay trả về region)
      ];
      const addressString = parts
        .filter((part) => part && part.trim().length > 0) // Lọc null, undefined và chuỗi rỗng
        .join(", ");
      return {
        location: locationObject,
        address: addressString,
      };
    }
  } catch (error) {
    // Nếu không có dữ liệu, trả về null
  }
  return null;
};

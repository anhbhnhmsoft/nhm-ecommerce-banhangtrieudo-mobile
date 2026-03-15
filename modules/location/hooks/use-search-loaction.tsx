import { useCallback, useRef, useState } from "react";
import { DetailLocation } from "./use-save-loaction";

// ─── Fake search results pool ─────────────────────────────────────────────────
const FAKE_POOL: (DetailLocation & { place_id: string })[] = [
  {
    place_id: "place_001",
    formatted_address: "215 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
    latitude: "10.7769",
    longitude: "106.7009",
  },
  {
    place_id: "place_002",
    formatted_address:
      "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    latitude: "10.7743",
    longitude: "106.7030",
  },
  {
    place_id: "place_003",
    formatted_address:
      "45 Đinh Tiên Hoàng, Phường Đakao, Quận 1, TP. Hồ Chí Minh",
    latitude: "10.7880",
    longitude: "106.6996",
  },
  {
    place_id: "place_004",
    formatted_address:
      "88 Lý Tự Trọng, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
    latitude: "10.7756",
    longitude: "106.6983",
  },
  {
    place_id: "place_005",
    formatted_address:
      "Chợ Bến Thành, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
    latitude: "10.7726",
    longitude: "106.6980",
  },
  {
    place_id: "place_006",
    formatted_address:
      "Nhà thờ Đức Bà, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    latitude: "10.7797",
    longitude: "106.6990",
  },
  {
    place_id: "place_007",
    formatted_address:
      "Bưu điện Trung tâm Sài Gòn, Công xã Paris, Quận 1, TP. Hồ Chí Minh",
    latitude: "10.7800",
    longitude: "106.6990",
  },
  {
    place_id: "place_008",
    formatted_address:
      "Vincom Center, 72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    latitude: "10.7760",
    longitude: "106.7020",
  },
  {
    place_id: "place_009",
    formatted_address:
      "98 Nguyễn Thị Minh Khai, Phường Nguyễn Thái Bình, Quận 1, TP. Hồ Chí Minh",
    latitude: "10.7790",
    longitude: "106.6950",
  },
  {
    place_id: "place_010",
    formatted_address:
      "Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh",
    latitude: "10.7950",
    longitude: "106.7220",
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useSearchLocation = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<
    (DetailLocation & { place_id: string })[]
  >([]);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tìm kiếm fake: lọc theo keyword trong địa chỉ (debounce 500ms)
  const search = useCallback((text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (text.trim().length <= 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(() => {
      const filtered = FAKE_POOL.filter((item) =>
        item.formatted_address
          .toLowerCase()
          .includes(text.toLowerCase().trim()),
      );
      setResults(filtered);
      setLoading(false);
    }, 500);
  }, []);

  // Cập nhật keyword và trigger search
  const handleChangeText = (text: string) => {
    setKeyword(text);
    search(text);
  };

  // Xoá keyword và reset kết quả
  const clearKeyword = () => {
    setKeyword("");
    setResults([]);
    setLoading(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
  };

  // Chọn 1 kết quả → trả về DetailLocation cho parent
  const handleSelect = (
    item: DetailLocation & { place_id: string },
    onSelectLocation: (location: DetailLocation) => void,
  ) => {
    onSelectLocation({
      formatted_address: item.formatted_address,
      latitude: item.latitude,
      longitude: item.longitude,
    });
    clearKeyword();
  };

  return {
    keyword,
    results,
    loading,
    handleChangeText,
    clearKeyword,
    handleSelect,
  };
};

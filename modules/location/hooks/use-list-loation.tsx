import { useState } from "react";
import { useLocationStore } from "../stores";
import { AddressItem, SelectAddress } from "../utils";
import { useGetLocation } from "./use-get-location";

// ─── Fake Types ───────────────────────────────────────────────────────────────
export type LocationItem = SelectAddress & {
  id: string;
};

type CurrentLocation = {
  address: string;
  location: {
    coords: {
      latitude: number;
      longitude: number;
    };
  };
};

// ─── Fake Data ────────────────────────────────────────────────────────────────
const FAKE_LOCATIONS: LocationItem[] = [
  {
    id: "1",
    address: "215 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
    desc: "Nhà riêng",
    latitude: "10.7769",
    longitude: "106.7009",
  },
  {
    id: "2",
    address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    desc: "Văn phòng",
    latitude: "10.7743",
    longitude: "106.7030",
  },
  {
    id: "3",
    address: "45 Đinh Tiên Hoàng, Phường Đakao, Quận 1, TP. Hồ Chí Minh",
    desc: "Nhà bạn bè",
    latitude: "10.7880",
    longitude: "106.6996",
  },
  {
    id: "4",
    address: "88 Lý Tự Trọng, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
    desc: "",
    latitude: "10.7756",
    longitude: "106.6983",
  },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useListLocation = () => {
  const location = useLocationStore((s) => s.location);
  const [items, setItems] = useState<LocationItem[]>(FAKE_LOCATIONS);
  const [isRefetching, setIsRefetching] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const setItemAddress = useLocationStore((s) => s.setItemAddress);

  // Giả lập react-query infinite list
  const queryList = {
    data: items,
    fetchNextPage: () => {},
    hasNextPage: false,
    isFetchingNextPage: false,
    refetch: () => {
      setIsRefetching(true);
      setTimeout(() => {
        setItems(FAKE_LOCATIONS);
        setIsRefetching(false);
      }, 1200);
    },
    isRefetching,
  };

  // Mở modal tạo mới
  const createHandler = () => {
    setItemAddress(null);
    setShowSaveModal(true);
  };

  // Mở modal chỉnh sửa
  const editHandler = (item: AddressItem) => {
    console.log(item);
    setItemAddress(item);
    setShowSaveModal(true);
  };

  // Xoá item
  const deleteHandler = (item: LocationItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  // Đóng modal lưu
  const closeSaveModal = () => {
    setShowSaveModal(false);
    setItemAddress(null);
  };

  // Lấy vị trí hiện tại (fake)
  const getCurrentLocation = useGetLocation();

  return {
    queryList,
    createHandler,
    editHandler,
    deleteHandler,
    closeSaveModal,
    showSaveModal,
    location,
    getCurrentLocation,
  };
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, focusManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactNode, useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";

// Cấu hình Focus Manager (Giữ nguyên logic của bạn)
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

// Tạo Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

// Tạo Persister (Bộ kết nối với AsyncStorage)
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "REACT_QUERY_OFFLINE_CACHE", // Tên key lưu trong máy

  throttleTime: 1000, // Chỉ lưu xuống đĩa tối đa 1 lần mỗi giây để đỡ lag
});

const QueryProvider = ({ children }: { children: ReactNode }) => {
  // Lắng nghe sự kiện AppState thay đổi
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: 1000 * 60 * 60 * 24 * 7, // Data lưu trên ổ cứng tối đa 7 ngày
        buster: "v1", // Đổi thành 'v2', 'v3'... khi bạn thay đổi cấu trúc data để xóa cache cũ
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export default QueryProvider;

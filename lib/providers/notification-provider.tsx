// import React, { useCallback, useEffect, useRef } from "react";
// import { Alert, Platform } from "react-native";
// import Constants from "expo-constants";
// import * as Notifications from "expo-notifications";
// import { useQueryClient } from "@tanstack/react-query";
// import { getInfoDevice } from "../utils/getInfoDevice";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//     shouldShowAlert: true,
//   }),
// });

// // Lấy token expo (không phải hook)
// export async function getExpoPushTokenAsyncOptions({
//   requestPermission = false,
// } = {}): Promise<null | { deviceInfo: any; token: string }> {
//   // Cấu hình Channel cho Android
//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#007AFF", // màu primary_color
//     });
//   }

//   // 1. Kiểm tra quyền
//   let { status } = await Notifications.getPermissionsAsync();

//   // Nếu chưa có quyền và muốn yêu cầu -> request
//   if (status !== "granted" && requestPermission) {
//     const perms = await Notifications.requestPermissionsAsync();
//     status = perms.status;
//   }

//   // Nếu chưa được cấp quyền -> skip
//   if (status !== "granted") {
//     return null;
//   }

//   // 3. Lấy projectId
//   const projectId = Constants.expoConfig?.extra?.eas?.projectId;

//   if (!projectId) return null;

//   try {
//     const deviceInfo = await getInfoDevice();
//     const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });

//     return {
//       deviceInfo,
//       token: tokenData.data,
//     };
//   } catch (error) {
//     return null;
//   }
// }

// // Đồng bộ token lên server khi user login hoặc app mở
// export const useSyncTokenToServer = () => {
//   const user = useAuthStore((state) => state.user);
//   return useCallback(async () => {
//     if (!user) return; // Chưa login thì không gửi
//     try {
//       const data = await getExpoPushTokenAsyncOptions({
//         requestPermission: true,
//       });
//       if (data) {
//         await apiNotification.registerDeviceToken({
//           device_type: data.deviceInfo.platform,
//           device_id: data.deviceInfo.deviceId,
//           expo_push_token: data.token,
//         });
//       }
//     } catch {
//       Alert.alert("Lỗi không nhận được thông báo");
//     }
//   }, [user]);
// };

// // Quản lý thông báo
// export const useNotification = () => {
//   const notificationListener = useRef<Notifications.EventSubscription>(null);
//   const responseListener = useRef<Notifications.EventSubscription>(null);
//   const syncTokenToServer = useSyncTokenToServer();
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     // 1. Tự động chạy khi User Login hoặc App mở
//     syncTokenToServer();

//     // 2. Setup Listeners
//     Notifications.addNotificationReceivedListener(() => {
//       queryClient.invalidateQueries({
//         queryKey: ["notifications"],
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["unreadCountNotification"],
//       });
//     });

//     return () => {
//       if (notificationListener.current) {
//         notificationListener.current.remove();
//       }
//       if (responseListener.current) {
//         responseListener.current.remove();
//       }
//     };
//   }, [syncTokenToServer, queryClient]); // Chạy lại khi user thay đổi (login/logout)
// };

// // Kiểm tra quyền thông báo
// export const useCheckNotificationPermission = () => {
//   return useCallback(async () => {
//     const { status } = await Notifications.getPermissionsAsync();
//     return status === "granted";
//   }, []);
// };

// // Component provider để gọi hooks và khởi tạo listeners
// export default function NotificationProvider({
//   children,
// }: {
//   children?: React.ReactNode;
// }) {
//   useNotification();
//   return <>{children}</>;
// }

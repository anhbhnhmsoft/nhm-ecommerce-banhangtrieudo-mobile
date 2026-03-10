import useFontInter from "@/lib/providers/font-inter";
import QueryProvider from "@/lib/providers/query-provider";
import initI18n from "@/lib/storage/i18n";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

/**
 * Prevent the splash screen from auto-hiding before asset loading is complete.
 */
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFontInter();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function initial() {
      try {
        // Khởi tạo i18n
        await initI18n();
      } finally {
        setReady(true);
      }
    }

    initial();
  }, []);

  useEffect(() => {
    if (ready && loaded && !error) {
      SplashScreen.hideAsync();
    }
  }, [ready, loaded, error]);

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            {/* Stack Navigator */}
            <AppContainer />
            {/* Toast Manager */}
            <ToastManager />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryProvider>
    </SafeAreaProvider>
  );
}

const AppContainer = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(auth)" />
    </Stack>
  );
};

import { Stack } from "expo-router";
import React from "react";

export default function LayoutPublic() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="product-details" />
      </Stack>
    </>
  );
}

import { Stack } from "expo-router";
import React from "react";

export default function LayoutCustomer() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="seller-registration" />
    </Stack>
  );
}

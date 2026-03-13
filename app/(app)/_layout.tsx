import { Stack } from "expo-router";
import React from "react";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(authenticate)" />
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(services)" />
    </Stack>
  );
}

import { Stack } from "expo-router";
import React from "react";

export default function LayoutAuthenticate() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="profile" />
      </Stack>
    </>
  );
}

import { HeaderApp } from "@/components/ui";
import Box from "@/components/ui/box";
import { HomeFooter, HomeHeader } from "@/components/utils";
import LoadingHome from "@/components/utils/loading-home";
import { responsiveSpacing, responsiveSpacingVertical } from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { ServiceCard } from "@/modules/services/components";
import { SERVICE_DATA } from "@/modules/services/utils";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

export default function Home() {
  const theme = useThemeStore((s) => s.colors);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <View style={[styles.safeArea, { backgroundColor: theme.primary[1] }]}>
      <HeaderApp />
      {loading ? (
        <LoadingHome />
      ) : (
        <FlatList
          data={SERVICE_DATA}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<HomeHeader />}
          ListFooterComponent={<HomeFooter />}
          renderItem={({ item }) => (
            <Box paddingHorizontal={responsiveSpacing(16)}>
              <ServiceCard item={item} />
            </Box>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary[2]}
              colors={[theme.primary[2]]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  listContent: {
    paddingTop: responsiveSpacingVertical(12),
    paddingBottom: responsiveSpacingVertical(24),
  },
});

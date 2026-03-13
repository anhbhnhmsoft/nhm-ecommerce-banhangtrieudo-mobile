import { Box, BoxShadow, HeaderBack, Typo } from "@/components/ui";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import { ServiceDateTimePicker } from "@/modules/services/components";
import { useBookingServices } from "@/modules/services/hooks/use-booking-services";
import { CalendarCheck } from "lucide-react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BookServiceScreen() {
  const theme = useThemeStore((s) => s.colors);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { form, loading, submit, handleDateTimeChange } = useBookingServices();
  const { control, handleSubmit } = form;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primary[1],
        },
      ]}
    >
      <HeaderBack title={t("services.book_service.title")} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Service card ── */}
        <Box
          paddingHorizontal={responsiveSpacing(16)}
          marginBottom={responsiveSpacingVertical(20)}
        >
          <BoxShadow
            radius={responsiveRadius(20)}
            padding={responsiveSpacing(12)}
          >
            <Box flexDirection="row" alignItems="center">
              <Box
                width={responsiveSize(72)}
                height={responsiveSize(72)}
                radius={responsiveRadius(20)}
                overflow="hidden"
                marginRight={responsiveSpacing(12)}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200",
                  }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </Box>
              <Box flex={1}>
                <Typo
                  fontSize={responsiveFont(10)}
                  weight="600"
                  color={theme.primary[2]}
                  textTransform="uppercase"
                  marginBottom={responsiveSpacingVertical(3)}
                >
                  {t("services.book_service.category")}
                </Typo>
                <Typo
                  fontSize={responsiveFont(14)}
                  weight="700"
                  color={theme.base[2]}
                  marginBottom={responsiveSpacingVertical(4)}
                >
                  {t("services.book_service.service_name")}
                </Typo>
                <Typo
                  fontSize={responsiveFont(12)}
                  weight="400"
                  color={theme.base[5]}
                  numberOfLines={2}
                >
                  {t("services.book_service.service_desc")}
                </Typo>
              </Box>
            </Box>
          </BoxShadow>
        </Box>

        <ServiceDateTimePicker onDateTimeChange={handleDateTimeChange} />

        {/* ── Thông tin liên hệ ── */}
        <Box
          paddingHorizontal={responsiveSpacing(16)}
          marginBottom={responsiveSpacingVertical(24)}
        >
          <Typo
            fontSize={responsiveFont(15)}
            weight="700"
            color={theme.base[2]}
            marginBottom={responsiveSpacingVertical(14)}
          >
            {t("services.book_service.contact_info")}
          </Typo>

          <BoxShadow
            radius={responsiveRadius(14)}
            padding={responsiveSpacing(14)}
          >
            {/* Ghi chú */}
            <Box>
              <Typo
                fontSize={responsiveFont(12)}
                weight="500"
                color={theme.base[5]}
                marginBottom={responsiveSpacingVertical(6)}
              >
                {t("services.book_service.note_label")}
              </Typo>
              <Controller
                name="note"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Box
                    radius={responsiveRadius(10)}
                    backgroundColor={theme.base[4]}
                    padding={responsiveSpacing(12)}
                  >
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      placeholder={t("services.book_service.note_placeholder")}
                      placeholderTextColor={theme.base[3]}
                      multiline
                      numberOfLines={4}
                      style={{
                        minHeight: responsiveSpacingVertical(80),
                        fontSize: responsiveFont(13),
                        color: theme.base[2],
                        textAlignVertical: "top",
                      }}
                    />
                  </Box>
                )}
              />
            </Box>
          </BoxShadow>
        </Box>
      </ScrollView>

      {/* ── Footer button ── */}
      <Box
        backgroundColor={theme.base[1]}
        paddingHorizontal={responsiveSpacing(16)}
        paddingTop={responsiveSpacingVertical(12)}
        paddingBottom={insets.bottom || responsiveSpacingVertical(20)}
        style={styles.footer}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.confirmBtn, { backgroundColor: theme.primary[2] }]}
          onPress={handleSubmit(submit, (e) =>
            console.log("Validation errors:", e),
          )}
          disabled={loading}
        >
          <Box flexDirection="row" alignItems="center">
            <CalendarCheck
              size={responsiveIcon(18)}
              color={theme.base[1]}
              style={{ marginRight: responsiveSpacing(8) }}
            />
            <Typo
              fontSize={responsiveFont(15)}
              weight="700"
              color={theme.base[1]}
            >
              {t("services.book_service.confirm_button")}
            </Typo>
          </Box>
        </TouchableOpacity>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingTop: responsiveSpacingVertical(12),
    paddingBottom: responsiveSpacingVertical(200),
  },
  dayCell: {
    width: `${100 / 7}%`,
    alignItems: "center",
    paddingVertical: responsiveSpacingVertical(4),
  },
  footer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmBtn: {
    borderRadius: responsiveRadius(12),
    paddingVertical: responsiveSpacingVertical(15),
    alignItems: "center",
    justifyContent: "center",
  },
});

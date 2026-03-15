import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Modal,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ChevronLeft,
  Map,
  MapPin,
  PlusCircle,
  Star,
  Tag,
  Trash2,
  X,
} from "lucide-react-native";

import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveRadius,
  responsiveSize,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";
import { useThemeStore } from "@/modules/app/stores";
import {
  useListLocation,
  useSaveLocation,
  useSearchLocation,
} from "@/modules/location/hooks";
import { DetailLocation, SelectAddress } from "@/modules/location/utils";
import { Controller } from "react-hook-form";
import { BoxShadow, HeaderBack } from "../ui";

// componnet này đang fake, chưa kết nối API, chỉ để demo UI và luồng thao tác lưu địa chỉ của người dùng
type ListLocationModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect?: (location: SelectAddress) => void;
};

export const ListLocationModal = ({
  visible,
  onClose,
  onSelect,
}: ListLocationModalProps) => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);

  const {
    queryList,
    createHandler,
    editHandler,
    deleteHandler,
    closeSaveModal,
    showSaveModal,
    location,
    getCurrentLocation,
  } = useListLocation();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = queryList;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.primary[1] }}>
        <HeaderBack title={t("location.title")} onBack={onClose} />

        <FlatList
          keyExtractor={(item, index) => `location-${item.id}-${index}`}
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            gap: responsiveSpacingVertical(12),
            paddingBottom: responsiveSpacingVertical(100),
            paddingHorizontal: responsiveSpacing(16),
            paddingTop: responsiveSpacingVertical(16),
          }}
          onEndReachedThreshold={0.5}
          // ── Header: Vị trí hiện tại ──
          ListHeaderComponent={() => (
            <Box
              paddingBottom={responsiveSpacingVertical(16)}
              borderBottomWidth={2}
              borderBottomColor={theme.base[4]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (location) {
                    onSelect?.({
                      address: location.address,
                      latitude: location.location.coords.latitude.toString(),
                      longitude: location.location.coords.longitude.toString(),
                      desc: location.address,
                    });
                  } else {
                    getCurrentLocation();
                  }
                }}
              >
                <BoxShadow
                  radius={responsiveRadius(12)}
                  style={{ backgroundColor: theme.primary[3] }}
                >
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    padding={responsiveSpacing(16)}
                  >
                    {/* Icon */}
                    <Box
                      width={responsiveSize(40)}
                      height={responsiveSize(40)}
                      radius={responsiveSize(20)}
                      backgroundColor={theme.primary[3]}
                      alignItems="center"
                      justifyContent="center"
                      marginRight={responsiveSpacing(12)}
                    >
                      <Star
                        size={responsiveIcon(20)}
                        color={theme.primary[2]}
                        fill={theme.primary[2]}
                      />
                    </Box>

                    {/* Text */}
                    <Box flex={1} paddingRight={responsiveSpacing(8)}>
                      <Typo
                        fontSize={responsiveFont(15)}
                        weight="700"
                        color={theme.base[2]}
                        numberOfLines={1}
                      >
                        {location
                          ? location.address.split(",")[0]
                          : t("location.need_location")}
                      </Typo>
                      <Typo
                        fontSize={responsiveFont(13)}
                        weight="400"
                        color={theme.primary[2]}
                        marginTop={responsiveSpacingVertical(2)}
                      >
                        {t("location.primary_address")}
                      </Typo>
                    </Box>
                  </Box>
                </BoxShadow>
              </TouchableOpacity>
            </Box>
          )}
          // ── Footer: Thêm địa chỉ / Loading ──
          ListFooterComponent={() => {
            if (!data || data.length === 0) return null;
            return (
              <Box
                marginTop={responsiveSpacingVertical(8)}
                paddingBottom={responsiveSpacingVertical(40)}
              >
                {isFetchingNextPage ? (
                  <Box paddingVertical={responsiveSpacingVertical(16)}>
                    <ActivityIndicator
                      size="small"
                      color={theme.secondary[2]}
                    />
                  </Box>
                ) : (
                  <TouchableOpacity onPress={createHandler} activeOpacity={0.8}>
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      paddingVertical={responsiveSpacingVertical(16)}
                      radius={responsiveRadius(12)}
                      borderWidth={1}
                      borderColor={theme.primary[2]}
                      backgroundColor={theme.base[1]}
                    >
                      <PlusCircle
                        size={responsiveIcon(20)}
                        color={theme.primary[2]}
                        style={{ marginRight: responsiveSpacing(8) }}
                      />
                      <Typo
                        fontSize={responsiveFont(14)}
                        weight="500"
                        color={theme.primary[2]}
                      >
                        {t("location.add_new_address")}
                      </Typo>
                    </Box>
                  </TouchableOpacity>
                )}
              </Box>
            );
          }}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => refetch()}
              tintColor={theme.primary[2]}
              colors={[theme.primary[2]]}
            />
          }
          // ── Item ──
          renderItem={({ item }) => (
            <TouchableOpacity
              key={`location-${item.id}`}
              onPress={() => editHandler(item)}
              activeOpacity={0.8}
            >
              <BoxShadow radius={responsiveRadius(12)}>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  padding={responsiveSpacing(16)}
                >
                  {/* Icon */}
                  <Box
                    width={responsiveSize(40)}
                    height={responsiveSize(40)}
                    radius={responsiveSize(20)}
                    backgroundColor={theme.base[4]}
                    alignItems="center"
                    justifyContent="center"
                    marginRight={responsiveSpacing(12)}
                  >
                    <MapPin size={responsiveIcon(20)} color={theme.base[5]} />
                  </Box>

                  {/* Text */}
                  <Box flex={1} paddingRight={responsiveSpacing(8)}>
                    <Typo
                      fontSize={responsiveFont(15)}
                      weight="700"
                      color={theme.base[2]}
                      numberOfLines={1}
                    >
                      {item.address.split(",")[0]}
                    </Typo>
                    <Typo
                      fontSize={responsiveFont(12)}
                      weight="400"
                      color={theme.base[5]}
                      marginTop={responsiveSpacingVertical(2)}
                      numberOfLines={1}
                    >
                      {item.desc ? `${item.desc} ` : t("location.no_desc")} -{" "}
                      {item.address}
                    </Typo>
                  </Box>

                  {/* Nút xoá */}
                  {!onSelect && (
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        deleteHandler(item);
                      }}
                      style={{ padding: responsiveSpacing(8) }}
                    >
                      <Trash2
                        size={responsiveIcon(20)}
                        color={theme.secondary[1]}
                      />
                    </TouchableOpacity>
                  )}
                </Box>
              </BoxShadow>
            </TouchableOpacity>
          )}
          // ── Empty ──
          ListEmptyComponent={
            <Box
              flex={1}
              alignItems="center"
              justifyContent="center"
              paddingHorizontal={responsiveSpacing(32)}
              paddingBottom={responsiveSpacingVertical(80)}
            >
              {/* Illustration */}
              <Box
                width={responsiveSize(160)}
                height={responsiveSize(160)}
                radius={responsiveSize(80)}
                backgroundColor={theme.base[4]}
                alignItems="center"
                justifyContent="center"
                marginBottom={responsiveSpacingVertical(24)}
              >
                <Map
                  size={responsiveSize(150)}
                  color={theme.base[3]}
                  strokeWidth={1}
                />
                <Box
                  position="absolute"
                  top={responsiveSize(40)}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    radius={responsiveRadius(999)}
                    backgroundColor={theme.base[1]}
                    padding={responsiveSpacing(4)}
                  >
                    <MapPin size={responsiveSize(48)} color={theme.base[5]} />
                  </Box>
                </Box>
              </Box>

              <Typo
                fontSize={responsiveFont(17)}
                weight="700"
                color={theme.base[2]}
                textAlign="center"
                marginBottom={responsiveSpacingVertical(8)}
              >
                {t("location.common_address")}
              </Typo>

              <Typo
                fontSize={responsiveFont(14)}
                weight="400"
                color={theme.base[5]}
                textAlign="center"
                marginBottom={responsiveSpacingVertical(32)}
              >
                {t("location.description")}
              </Typo>

              <TouchableOpacity onPress={createHandler} activeOpacity={0.8}>
                <Box
                  flexDirection="row"
                  alignItems="center"
                  radius={responsiveRadius(999)}
                  backgroundColor={theme.primary[3]}
                  paddingHorizontal={responsiveSpacing(24)}
                  paddingVertical={responsiveSpacingVertical(12)}
                >
                  <PlusCircle
                    size={responsiveIcon(20)}
                    color={theme.secondary[2]}
                    style={{ marginRight: responsiveSpacing(8) }}
                  />
                  <Typo
                    fontSize={responsiveFont(15)}
                    weight="500"
                    color={theme.secondary[2]}
                  >
                    {t("location.add_new_address")}
                  </Typo>
                </Box>
              </TouchableOpacity>
            </Box>
          }
        />

        <SaveLocationModal visible={showSaveModal} onClose={closeSaveModal} />
      </SafeAreaView>
    </Modal>
  );
};

// componnet này đang fake, chưa kết nối API, chỉ để demo UI và luồng thao tác lưu địa chỉ của người dùng
type SaveLocationModalProps = {
  visible: boolean;
  onClose: () => void;
};

const SaveLocationModal = ({ visible, onClose }: SaveLocationModalProps) => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);

  const [showSearch, setShowSearch] = useState(false);

  const { form, submit, isEdit, setLocationCurrent, loading, locationLoading } =
    useSaveLocation(onClose);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const currentAddress = watch("address");

  const handleSelectLocation = (location: DetailLocation) => {
    setValue("address", location.formatted_address, { shouldValidate: true });
    setValue("latitude", location.latitude, { shouldValidate: true });
    setValue("longitude", location.longitude, { shouldValidate: true });
    setShowSearch(false);
  };

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.primary[1] }}>
        {/* Header */}
        <HeaderBack
          title={isEdit ? t("location.title_edit") : t("location.title_add")}
          onBack={onClose}
        />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: responsiveSpacing(16) }}
            keyboardShouldPersistTaps="handled"
          >
            {/* 1. CHỌN ĐỊA CHỈ */}
            <Box marginBottom={responsiveSpacingVertical(24)}>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={responsiveSpacingVertical(8)}
              >
                <Typo
                  fontSize={responsiveFont(13)}
                  weight="600"
                  color={theme.base[2]}
                >
                  {t("location.label_address")} *
                </Typo>

                {/* Nút lấy vị trí hiện tại */}
                <TouchableOpacity
                  onPress={setLocationCurrent}
                  activeOpacity={0.8}
                  disabled={locationLoading}
                >
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    radius={responsiveRadius(8)}
                    backgroundColor={theme.primary[3]}
                    paddingHorizontal={responsiveSpacing(10)}
                    paddingVertical={responsiveSpacingVertical(6)}
                    opacity={locationLoading ? 0.6 : 1}
                  >
                    {locationLoading ? (
                      <ActivityIndicator
                        size="small"
                        color={theme.base[2]}
                        style={{ marginRight: responsiveSpacing(4) }}
                      />
                    ) : (
                      <MapPin
                        size={responsiveIcon(16)}
                        color={theme.primary[2]}
                        style={{ marginRight: responsiveSpacing(4) }}
                      />
                    )}
                    <Typo
                      fontSize={responsiveFont(12)}
                      weight="500"
                      color={theme.primary[2]}
                    >
                      {locationLoading
                        ? t("location.getting_location")
                        : t("location.get_current_location")}
                    </Typo>
                  </Box>
                </TouchableOpacity>
              </Box>

              {/* Input giả — mở SearchModal khi bấm */}
              <TouchableOpacity
                onPress={() => !locationLoading && setShowSearch(true)}
                activeOpacity={0.8}
                disabled={locationLoading}
              >
                <BoxShadow radius={responsiveRadius(12)}>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    padding={responsiveSpacing(16)}
                    minHeight={responsiveSpacingVertical(64)}
                  >
                    {/* Icon trái */}
                    <Box
                      width={responsiveSize(36)}
                      height={responsiveSize(36)}
                      radius={responsiveSize(18)}
                      backgroundColor={
                        locationLoading ? theme.base[4] : theme.primary[3]
                      }
                      alignItems="center"
                      justifyContent="center"
                      marginRight={responsiveSpacing(12)}
                    >
                      {locationLoading ? (
                        <ActivityIndicator
                          size="small"
                          color={theme.primary[2]}
                        />
                      ) : (
                        <MapPin
                          size={responsiveIcon(20)}
                          color={theme.primary[2]}
                        />
                      )}
                    </Box>

                    {/* Nội dung */}
                    <Box flex={1}>
                      {locationLoading ? (
                        <>
                          {/* Skeleton line 1 */}
                          <Box
                            height={responsiveSpacingVertical(12)}
                            width="70%"
                            radius={responsiveRadius(6)}
                            backgroundColor={theme.base[4]}
                            marginBottom={responsiveSpacingVertical(8)}
                          />
                          {/* Skeleton line 2 */}
                          <Box
                            height={responsiveSpacingVertical(10)}
                            width="50%"
                            radius={responsiveRadius(6)}
                            backgroundColor={theme.base[4]}
                          />
                        </>
                      ) : currentAddress ? (
                        <Typo
                          fontSize={responsiveFont(14)}
                          weight="500"
                          color={theme.base[2]}
                          lineHeight={responsiveSpacingVertical(22)}
                        >
                          {currentAddress}
                        </Typo>
                      ) : (
                        <Typo
                          fontSize={responsiveFont(14)}
                          weight="400"
                          color={theme.base[3]}
                        >
                          {t("location.placeholder_address")}
                        </Typo>
                      )}
                    </Box>
                  </Box>
                </BoxShadow>
              </TouchableOpacity>

              {/* Error messages */}
              {errors.address && (
                <Typo
                  fontSize={responsiveFont(12)}
                  weight="400"
                  color={theme.secondary[1]}
                  marginTop={responsiveSpacingVertical(6)}
                  marginLeft={responsiveSpacing(4)}
                >
                  {errors.address.message}
                </Typo>
              )}
              {(errors.latitude || errors.longitude) && !errors.address && (
                <Typo
                  fontSize={responsiveFont(12)}
                  weight="400"
                  color={theme.secondary[1]}
                  marginTop={responsiveSpacingVertical(6)}
                  marginLeft={responsiveSpacing(4)}
                >
                  {t("location.error.invalid_address")}
                </Typo>
              )}
            </Box>

            {/* 2. TÊN GỢI NHỚ (DESC) */}
            <Box marginBottom={responsiveSpacingVertical(24)}>
              <Typo
                fontSize={responsiveFont(13)}
                weight="600"
                color={theme.base[2]}
                marginBottom={responsiveSpacingVertical(8)}
              >
                {t("location.label_desc")}
              </Typo>

              <Controller
                control={control}
                name="desc"
                render={({ field: { onChange, onBlur, value } }) => (
                  <BoxShadow radius={responsiveRadius(12)}>
                    <Box
                      flexDirection="row"
                      alignItems="flex-start"
                      padding={responsiveSpacing(16)}
                    >
                      <Tag
                        size={responsiveIcon(20)}
                        color={theme.base[3]}
                        style={{
                          marginRight: responsiveSpacing(12),
                          marginTop: 2,
                        }}
                      />
                      <TextInput
                        style={{
                          flex: 1,
                          minHeight: responsiveSpacingVertical(96),
                          fontSize: responsiveFont(14),
                          color: theme.base[2],
                        }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        multiline
                        numberOfLines={6}
                        placeholder={t("location.placeholder_desc")}
                        placeholderTextColor={theme.base[3]}
                      />
                    </Box>
                  </BoxShadow>
                )}
              />
            </Box>
          </ScrollView>
        </TouchableWithoutFeedback>

        {/* Footer button */}
        <Box
          backgroundColor={theme.base[1]}
          padding={responsiveSpacing(16)}
          borderTopWidth={1}
          borderTopColor={theme.base[4]}
        >
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Box
              radius={responsiveRadius(999)}
              backgroundColor={theme.primary[2]}
              alignItems="center"
              justifyContent="center"
              paddingVertical={responsiveSpacingVertical(16)}
            >
              <Typo
                fontSize={responsiveFont(16)}
                weight="700"
                color={theme.base[1]}
              >
                {loading ? t("location.loading") : t("location.save_address")}
              </Typo>
            </Box>
          </TouchableOpacity>
        </Box>

        <SearchLocationModal
          visible={showSearch}
          onClose={() => setShowSearch(false)}
          onSelectLocation={handleSelectLocation}
        />
      </SafeAreaView>
    </Modal>
  );
};

// ─── SearchLocationModal ──────────────────────────────────────────────────────
type LocationSearchModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (location: DetailLocation) => void;
};

const SearchLocationModal: FC<LocationSearchModalProps> = ({
  visible,
  onClose,
  onSelectLocation,
}) => {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.colors);
  const {
    keyword,
    results,
    loading,
    handleChangeText,
    clearKeyword,
    handleSelect,
  } = useSearchLocation();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.primary[1] }}>
        {/* Header: Back + Search input */}
        <Box
          flexDirection="row"
          alignItems="center"
          paddingHorizontal={responsiveSpacing(16)}
          paddingVertical={responsiveSpacingVertical(12)}
          borderBottomWidth={1}
          borderBottomColor={theme.base[4]}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              padding: responsiveSpacing(4),
              marginRight: responsiveSpacing(8),
            }}
          >
            <ChevronLeft size={responsiveIcon(28)} color={theme.base[2]} />
          </TouchableOpacity>

          <Box
            flex={1}
            flexDirection="row"
            alignItems="center"
            radius={responsiveRadius(10)}
            backgroundColor={theme.base[1]}
            paddingHorizontal={responsiveSpacing(12)}
            paddingVertical={responsiveSpacingVertical(8)}
          >
            {/* Dot đỏ kiểu Grab */}
            <Box
              width={8}
              height={8}
              radius={4}
              backgroundColor={theme.secondary[3]}
              marginRight={responsiveSpacing(10)}
            />

            <TextInput
              style={{
                flex: 1,
                fontSize: responsiveFont(14),
                color: theme.base[2],
                lineHeight: responsiveSpacingVertical(20),
              }}
              placeholder={t("location.search_placeholder")}
              placeholderTextColor={theme.base[3]}
              value={keyword}
              onChangeText={handleChangeText}
              autoFocus
              clearButtonMode="while-editing"
            />

            {keyword.length > 0 && (
              <TouchableOpacity onPress={() => clearKeyword()}>
                <X size={responsiveIcon(16)} color={theme.base[3]} />
              </TouchableOpacity>
            )}
          </Box>
        </Box>

        {/* Content */}
        <Box flex={1} backgroundColor={theme.primary[1]}>
          {loading ? (
            <Box paddingVertical={responsiveSpacingVertical(16)}>
              <ActivityIndicator color={theme.primary[2]} />
            </Box>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item) => item.place_id}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item, onSelectLocation)}
                  activeOpacity={0.7}
                >
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    paddingHorizontal={responsiveSpacing(16)}
                    paddingVertical={responsiveSpacingVertical(14)}
                    borderBottomWidth={1}
                    borderBottomColor={theme.base[4]}
                  >
                    <Box
                      width={responsiveSize(40)}
                      height={responsiveSize(40)}
                      radius={responsiveSize(20)}
                      backgroundColor={theme.base[4]}
                      alignItems="center"
                      justifyContent="center"
                      marginRight={responsiveSpacing(12)}
                    >
                      <MapPin size={responsiveIcon(20)} color={theme.base[5]} />
                    </Box>
                    <Box flex={1}>
                      <Typo
                        fontSize={responsiveFont(14)}
                        weight="500"
                        color={theme.base[2]}
                      >
                        {item.formatted_address}
                      </Typo>
                    </Box>
                  </Box>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                !loading && keyword.length > 2 ? (
                  <Box
                    alignItems="center"
                    paddingVertical={responsiveSpacingVertical(32)}
                  >
                    <Typo
                      fontSize={responsiveFont(14)}
                      weight="400"
                      color={theme.base[5]}
                    >
                      {t("location.no_result")}
                    </Typo>
                  </Box>
                ) : null
              }
            />
          )}
        </Box>
      </SafeAreaView>
    </Modal>
  );
};

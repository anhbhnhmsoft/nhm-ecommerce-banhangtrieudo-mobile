import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import z from "zod";
import { useLocationStore } from "../stores";
import { useGetLocation } from "./use-get-location";

export type SaveLocationForm = {
  address: string;
  latitude: number;
  longitude: number;
  desc?: string;
};

export type DetailLocation = {
  formatted_address: string;
  latitude: string;
  longitude: string;
};

export const useSaveLocation = (onClose: () => void) => {
  const { t } = useTranslation();

  const item_address = useLocationStore((s) => s.item_address);
  const [locationLoading, setLoacationLoading] = useState(false);

  const getCurrentLocation = useGetLocation();
  const form = useForm<SaveLocationForm>({
    defaultValues: {
      address: item_address?.address || "",
      latitude: Number(item_address?.latitude) || undefined,
      longitude: Number(item_address?.longitude) || undefined,
      desc: item_address?.desc || "",
    },
    resolver: zodResolver(
      z.object({
        address: z
          .string({ error: t("location.error.invalid_address") })
          .min(5, { error: t("location.error.invalid_address") })
          .max(255, { error: t("location.error.invalid_address") }),
        latitude: z
          .number({ error: t("location.error.invalid_location") })
          .min(-90)
          .max(90),
        longitude: z
          .number({ error: t("location.error.invalid_location") })
          .min(-180)
          .max(180),
        desc: z.string().optional(),
      }),
    ),
  });

  useEffect(() => {
    // Cập nhật lại default values khi item_address thay đổi
    form.reset({
      address: item_address?.address || "",
      latitude: Number(item_address?.latitude) || undefined,
      longitude: Number(item_address?.longitude) || undefined,
      desc: item_address?.desc || "",
    });
  }, [item_address]);

  // Giả lập submit lưu địa chỉ
  const submit = async (data: SaveLocationForm) => {
    try {
      // Fake API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Saved location:", data);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Save location error:", error);
    } finally {
    }
  };

  const setLocationCurrent = async () => {
    setLoacationLoading(true);
    try {
      const location = await getCurrentLocation();
      console.log("Current location:", location);
      if (location) {
        form.setValue("address", location.address);
        form.setValue("latitude", location.location.coords.latitude);
        form.setValue("longitude", location.location.coords.longitude);
      }
    } catch {
      Alert.alert(
        t("location.error.title"),
        t("location.error.current_location_failed"),
      );
    } finally {
      setLoacationLoading(false);
    }
  };
  return {
    form,
    submit,
    isEdit: Boolean(item_address),
    setLocationCurrent,
    loading: false,
    locationLoading,
  };
};

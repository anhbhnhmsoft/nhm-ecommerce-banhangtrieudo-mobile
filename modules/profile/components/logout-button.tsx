import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  verticalScale,
} from "@/lib/utils";
import { LogOut } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface LogoutButtonProps {
  onPress?: () => void;
}

export const LogoutButton = ({ onPress }: LogoutButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.logoutBtn, { borderColor: "#E7000B" }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <LogOut size={responsiveIcon(16)} color="#E7000B" />
      <Typo
        fontSize={responsiveFont(14)}
        color="#E7000B"
        weight="700"
        marginLeft={responsiveSpacing(8)}
      >
        Đăng xuất
      </Typo>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    height: verticalScale(48),
    borderRadius: 999,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

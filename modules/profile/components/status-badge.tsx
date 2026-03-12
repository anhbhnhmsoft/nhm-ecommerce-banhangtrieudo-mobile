import Box from "@/components/ui/box";
import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils";

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; color: string }
> = {
  pending: { label: "Chờ duyệt", bg: "#FFF8E1", color: "#FF8F00" },
  delivering: { label: "Đang giao", bg: "#E3F2FD", color: "#1976D2" },
  done: { label: "Hoàn thành", bg: "#E8F5E9", color: "#2E7D32" },
  cancelled: { label: "Đã huỷ", bg: "#FEECEC", color: "#E7000B" },
};

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <Box
      backgroundColor={cfg.bg}
      paddingHorizontal={responsiveSpacing(10)}
      paddingVertical={responsiveSpacingVertical(3)}
      radius={999}
    >
      <Typo fontSize={responsiveFont(11)} color={cfg.color} weight="600">
        {cfg.label}
      </Typo>
    </Box>
  );
};

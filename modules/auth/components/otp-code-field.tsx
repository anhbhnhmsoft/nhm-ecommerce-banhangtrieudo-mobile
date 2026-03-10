import Typo from "@/components/ui/typo";
import { CELL_OTP_COUNT } from "@/lib/consts";
import { responsiveFont, responsiveSpacing } from "@/lib/utils/responsive";
import { useThemeStore } from "@/modules/app/stores/use-theme-store";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

type Props = {
  value: string;
  setValue: (text: string) => void;
};

const OtpCodeField: FC<Props> = ({ value, setValue }) => {
  const theme = useThemeStore((state) => state.colors);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_OTP_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_OTP_COUNT}
      rootStyle={styles.root}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoFocus={true}
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          onLayout={getCellOnLayoutHandler(index)}
          style={[
            styles.cell,
            {
              borderColor: isFocused ? theme.primary[2] : theme.base[3],
              borderWidth: isFocused ? 1.5 : 1,
              backgroundColor: theme.base[1],
            },
          ]}
        >
          <Typo
            fontSize={responsiveFont(22)}
            weight="500"
            color={theme.base[2]}
            textAlign="center"
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Typo>
        </View>
      )}
    />
  );
};

export default OtpCodeField;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    marginTop: 0,
  },
  cell: {
    width: responsiveSpacing(44),
    height: responsiveSpacing(44),
    borderRadius: responsiveSpacing(12),
    justifyContent: "center",
    alignItems: "center",
  },
});

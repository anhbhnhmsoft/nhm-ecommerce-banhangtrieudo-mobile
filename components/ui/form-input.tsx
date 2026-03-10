import Typo from "@/components/ui/typo";
import {
  responsiveFont,
  responsiveIcon,
  responsiveSpacing,
  responsiveSpacingVertical,
} from "@/lib/utils/responsive";
import { useThemeStore } from "@/modules/app/stores/use-theme-store";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  isPassword?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerStyle?: object;
  description?: string;
  isTextArea?: boolean;
  numberOfLines?: number;
}

export const FormLabel = ({
  label,
  required,
  description,
}: Pick<FormInputProps, "label" | "required" | "description">) => {
  const theme = useThemeStore((state) => state.colors);
  return (
    <View style={styles.labelContainer}>
      <Typo weight="500" fontSize={responsiveFont(14)} color={theme.base[2]}>
        {label}
        {required && (
          <Typo
            weight="500"
            fontSize={responsiveFont(14)}
            color={theme.secondary[1]}
          >
            {" "}
            *
          </Typo>
        )}
      </Typo>
      {description && (
        <Typo
          fontSize={responsiveFont(12)}
          color={theme.base[5]}
          italic
          marginTop={responsiveSpacingVertical(2)}
        >
          {description}
        </Typo>
      )}
    </View>
  );
};

export const FormError = ({ error }: Pick<FormInputProps, "error">) => {
  const theme = useThemeStore((state) => state.colors);
  if (!error) return null;
  return (
    <Typo
      fontSize={responsiveFont(12)}
      color={theme.secondary[1]}
      italic
      marginTop={responsiveSpacingVertical(2)}
    >
      {error}
    </Typo>
  );
};

export const FormInput = React.forwardRef<TextInput, FormInputProps>(
  (
    {
      label,
      description,
      error,
      required,
      isPassword,
      rightIcon,
      leftIcon,
      containerStyle,
      style,
      isTextArea,
      numberOfLines = 4,
      ...props
    },
    ref,
  ) => {
    const theme = useThemeStore((state) => state.colors);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isSecure = isPassword ? !isPasswordVisible : props.secureTextEntry;

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && (
          <FormLabel
            label={label}
            required={required}
            description={description}
          />
        )}

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.base[1],
              borderColor: error ? theme.secondary[1] : "#ECECEC",
            },
            isTextArea && styles.inputContainerTextArea,
          ]}
        >
          {leftIcon && <View style={styles.leftIconWrapper}>{leftIcon}</View>}

          <TextInput
            ref={ref}
            secureTextEntry={isSecure}
            placeholderTextColor={theme.base[3]}
            multiline={isTextArea}
            numberOfLines={isTextArea ? numberOfLines : 1}
            textAlignVertical={isTextArea ? "top" : "center"}
            style={[
              styles.input,
              { color: theme.base[2] },
              leftIcon ? styles.inputWithLeftIcon : undefined,
              isPassword || rightIcon ? styles.inputWithRightIcon : undefined,
              isTextArea ? styles.inputTextArea : undefined,
              { includeFontPadding: false } as any,
              style,
            ]}
            {...props}
          />

          {!isTextArea && (isPassword || rightIcon) && (
            <View style={styles.rightIconWrapper}>
              {isPassword ? (
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  hitSlop={{
                    top: responsiveSpacing(10),
                    bottom: responsiveSpacing(10),
                    left: responsiveSpacing(10),
                    right: responsiveSpacing(10),
                  }}
                >
                  {isPasswordVisible ? (
                    <EyeOff size={responsiveIcon(18)} color={theme.base[3]} />
                  ) : (
                    <Eye size={responsiveIcon(18)} color={theme.base[3]} />
                  )}
                </TouchableOpacity>
              ) : (
                rightIcon
              )}
            </View>
          )}
        </View>

        <FormError error={error} />
      </View>
    );
  },
);

FormInput.displayName = "FormInput";

const styles = StyleSheet.create({
  wrapper: {
    gap: responsiveSpacingVertical(6),
    marginBottom: responsiveSpacingVertical(14),
  },
  labelContainer: {
    marginBottom: responsiveSpacingVertical(6),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: responsiveSpacing(36),
    borderWidth: 1,
    overflow: "hidden",
  },
  inputContainerTextArea: {
    alignItems: "flex-start",
    minHeight: responsiveSpacingVertical(100),
  },
  leftIconWrapper: {
    paddingLeft: responsiveSpacing(16),
    paddingRight: responsiveSpacing(4),
    justifyContent: "center",
    alignItems: "center",
  },
  rightIconWrapper: {
    paddingRight: responsiveSpacing(16),
    paddingLeft: responsiveSpacing(4),
    height: responsiveSpacingVertical(50),
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: responsiveSpacingVertical(50),
    paddingHorizontal: responsiveSpacing(14),
    fontSize: responsiveFont(14),
  },
  inputWithLeftIcon: {
    paddingLeft: responsiveSpacing(6),
  },
  inputWithRightIcon: {
    paddingRight: responsiveSpacing(6),
  },
  inputTextArea: {
    height: undefined,
    minHeight: responsiveSpacingVertical(100),
    paddingTop: responsiveSpacingVertical(14),
    paddingBottom: responsiveSpacingVertical(14),
  },
});

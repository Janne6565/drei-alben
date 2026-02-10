import usePrimaryColor from "@/hooks/use-primary-color";
import {Pressable, Text, ViewStyle} from "react-native";

type ButtonVariant = "primary" | "secondary" | "destructive";

export function Button({
  label,
  onPress,
  variant = "primary",
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
}) {
  const primaryColor = usePrimaryColor();

  const getVariantStyles = (pressed: boolean): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
      opacity: pressed ? 0.6 : 1,
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: primaryColor,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: primaryColor,
        };
      case "destructive":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#ef4444",
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case "primary":
        return "white";
      case "secondary":
        return primaryColor;
      case "destructive":
        return "#ef4444";
      default:
        return "white";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({pressed}) => [getVariantStyles(pressed), style]}
    >
      <Text style={{color: getTextColor(), fontWeight: "600"}}>{label}</Text>
    </Pressable>
  );
}

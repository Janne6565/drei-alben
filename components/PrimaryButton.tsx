import usePrimaryColor from "@/hooks/use-primary-color";
import {Pressable, Text, ViewStyle} from "react-native";

export function PrimaryButton({
                                label,
                                onPress,
                                style
                              }: {
  label: string;
  onPress: () => void;
  style?: ViewStyle
}) {
  const primaryColor = usePrimaryColor();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({pressed}) => [
        {
          opacity: pressed ? 0.6 : 1,
          backgroundColor: primaryColor,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          alignItems: "center",
        },
        style
      ]}
    >
      <Text style={{color: "white", fontWeight: "600"}}>{label}</Text>
    </Pressable>
  );
}

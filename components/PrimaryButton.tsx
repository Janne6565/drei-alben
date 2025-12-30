import usePrimaryColor from "@/hooks/use-primary-color";
import { Pressable, Text } from "react-native";

export function PrimaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  const primaryColor = usePrimaryColor();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.6 : 1,
          backgroundColor: primaryColor,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          alignItems: "center",
        },
      ]}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>{label}</Text>
    </Pressable>
  );
}

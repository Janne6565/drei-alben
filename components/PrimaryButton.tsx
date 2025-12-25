import { Pressable, Text } from "react-native";

export function PrimaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.6 : 1,
          backgroundColor: "rgba(82, 180, 230, 1)",
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

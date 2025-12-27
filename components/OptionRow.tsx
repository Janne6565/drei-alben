import { SortDirection } from "@/features/historySettings/historySettings.types";
import { Ionicons } from "@expo/vector-icons"; // or any icon lib
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";

type OptionRowProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  direction: SortDirection;
};

export function OptionRow({
  label,
  selected,
  onPress,
  direction,
}: OptionRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.row, { opacity: selected ? 0.8 : 0.5 }]}
    >
      <ThemedText style={styles.label}>{label}</ThemedText>
      {selected && (
        <Ionicons
          name={direction === "asc" ? "arrow-up" : "arrow-down"}
          size={20}
          color="white"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    gap: 10,
  },
  label: {
    fontSize: 16,
  },
});

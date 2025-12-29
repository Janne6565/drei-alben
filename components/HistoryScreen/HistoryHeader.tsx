import { openHistoryFilterModal, openHistoryOptionsModal } from "@/features/modals/modals.slice";
import { useAppDispatch } from "@/store/hooks";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const HistoryHeader = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.headerButtons}>
      <TouchableOpacity
        onPress={() => dispatch(openHistoryFilterModal())}
        hitSlop={10}
      >
        <Feather name="filter" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(openHistoryOptionsModal())}
        hitSlop={10}
      >
        <Feather name="settings" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerButtons: {
    position: "absolute",
    top: 55,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    gap: 15,
  },
});

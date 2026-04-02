import {openHistoryFilterModal, openHistoryInfoModal, openHistoryOptionsModal} from "@/features/modals/modals.slice";
import {useAppDispatch} from "@/store/hooks";
import Feather from "@expo/vector-icons/Feather";
import {StyleSheet, TouchableOpacity, View} from "react-native";

export const HistoryHeader = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.headerButtons}>
      <View>
        <TouchableOpacity
          onPress={() => dispatch(openHistoryInfoModal())}
          hitSlop={10}
          style={styles.iconButton}
        >
          <Feather name="info" size={25} color="white"/>
        </TouchableOpacity>
      </View>
      <View style={styles.rightSide}>
        <TouchableOpacity
          onPress={() => dispatch(openHistoryFilterModal())}
          hitSlop={10}
        >
          <Feather name="filter" size={25} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(openHistoryOptionsModal())}
          hitSlop={10}
        >
          <Feather name="settings" size={25} color="white"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerButtons: {
    position: "absolute",
    top: 55,
    zIndex: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 25,
    gap: 15,
  },
  rightSide: {
    flexDirection: "row",
    gap: 15,
  },
  iconButton: {}
});

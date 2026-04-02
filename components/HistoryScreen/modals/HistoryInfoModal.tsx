import { closeHistoryInfoModal } from "@/features/modals/modals.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../../themed-text";
import BottomModal from "../../ui/bottom-modal";
import {Link} from "expo-router";

const HistoryInfoModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modals.historyInfo);
  const infoModalRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (isOpen) {
      infoModalRef.current?.present();
    } else {
      infoModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const onDismiss = () => {
    dispatch(closeHistoryInfoModal());
  };

  return (
    <BottomModal ref={infoModalRef} height={"35%"} onDismiss={onDismiss}>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Hinweis</ThemedText>
        <View style={styles.divider} />
        <ThemedText style={styles.text}>
          Alle von dieser App verwendeten Daten stammen aus den APIs von{" "}
          <ThemedText style={styles.highlight}><Link href={"https://ddfdb.de"}>ddfdb.de</Link></ThemedText> und{" "}
          <ThemedText style={styles.highlight}><Link href={"https://dreimetadaten.de"}>dreimetadaten.de</Link></ThemedText>.
        </ThemedText>
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },

  // Icon
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(1, 105, 111, 0.12)", // teal tint
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconText: {
    fontSize: 22,
    lineHeight: 26,
  },

  // Title
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.3,
    marginBottom: 12,
  },

  // Divider
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 16,
  },

  // Body
  text: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    opacity: 0.75,
  },

  // Inline highlighted source names
  highlight: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "600",
    opacity: 1,
  },
});

export default HistoryInfoModal;

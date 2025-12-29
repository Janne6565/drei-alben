import {
  setSortDirection,
  setSortMode,
} from "@/features/historySettings/historySettings.slice";
import { HistorySortMode } from "@/features/historySettings/historySettings.types";
import { closeHistoryOptionsModal } from "@/features/modals/modals.slice";
import { clearSeenAlbums } from "@/features/sessionData/sessionData.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { assertUserConfirmation } from "@/util/assert-user-confirmation";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { OptionRow } from "../../OptionRow";
import { PrimaryButton } from "../../PrimaryButton";
import { ThemedText } from "../../themed-text";
import BottomModal from "../../ui/bottom-modal";

const HistoryOptionsModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modals.historyOptions);
  const { sortDirection, sortMode } = useAppSelector(
    (state) => state.historySettings
  );
  const insets = useSafeAreaInsets();
  const optionsModalRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (isOpen) {
      optionsModalRef.current?.present();
    } else {
      optionsModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const onDismiss = () => {
    dispatch(closeHistoryOptionsModal());
  };

  const handleClick = useCallback(
    (value: HistorySortMode) => {
      if (sortMode === value) {
        dispatch(setSortDirection(sortDirection === "asc" ? "desc" : "asc"));
      } else {
        dispatch(setSortMode(value));
      }
    },
    [dispatch, sortDirection, sortMode]
  );

  const openClearAllModal = () => {
    assertUserConfirmation({
      title: "Bestätigen",
      message:
        "Bist du dir sicher, dass du deine gesamte Historie zurücksetzen willst?",
      onConfirm: () => dispatch(clearSeenAlbums()),
      confirmationText: "Zurücksetzen",
    });
  };

  return (
    <BottomModal
      ref={optionsModalRef}
      height={"60%"}
      onDismiss={onDismiss}
      asChild
    >
      <BottomSheetView
        style={[styles.optionsContainer, { paddingBottom: insets.bottom }]}
      >
        <ThemedText style={styles.modalTitle}>Einstellungen</ThemedText>
        <View>
          <ThemedText>Sortieren nach</ThemedText>
          <OptionRow
            label="Gehört am"
            selected={sortMode === "listenedDate"}
            onPress={() => handleClick("listenedDate")}
            direction={sortDirection}
          />

          <OptionRow
            label="Veröffentlicht am"
            selected={sortMode === "releaseDate"}
            onPress={() => handleClick("releaseDate")}
            direction={sortDirection}
          />

          <OptionRow
            label="Such übereinstimmung"
            selected={sortMode === "searchAccuracy"}
            onPress={() => handleClick("searchAccuracy")}
            direction={sortDirection}
          />
        </View>

        <PrimaryButton
          label="Gehörte Alben zurücksetzen"
          onPress={() => {
            openClearAllModal();
            optionsModalRef.current?.dismiss();
          }}
        />
      </BottomSheetView>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    padding: 22,
    gap: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  optionRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default HistoryOptionsModal;

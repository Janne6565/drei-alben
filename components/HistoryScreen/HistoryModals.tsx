import {
  setShowAllAlbums,
  setSortMode,
} from "@/features/historySettings/historySettings.slice";
import { HistorySortMode } from "@/features/historySettings/historySettings.types";
import { useAppDispatch } from "@/store/hooks";
import { AlbumDto } from "@/types/albums";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import AlbumDetailsModalContents from "../AlbumDisplay/AlbumDetailsModalContents";
import { MusicProviderList } from "../AlbumDisplay/MusicOpenModal/MusicOpenModal";
import { OptionRow } from "../OptionRow";
import { PrimaryButton } from "../PrimaryButton";
import { ThemedText } from "../themed-text";
import BottomModal from "../ui/bottom-modal";

type HistoryModalsProps = {
  albumDetailsModalRef: React.RefObject<BottomSheetModal | null>;
  optionsModalRef: React.RefObject<BottomSheetModal | null>;
  openAlbumModalRef: React.RefObject<BottomSheetModal | null>;
  selectedAlbum: AlbumDto | null;
  sortMode: HistorySortMode;
  showAllAlbums: boolean;
  openClearAllModal: () => void;
};

export function HistoryModals({
  albumDetailsModalRef,
  optionsModalRef,
  openAlbumModalRef,
  selectedAlbum,
  sortMode,
  showAllAlbums,
  openClearAllModal,
}: HistoryModalsProps) {
  const dispatch = useAppDispatch();

  return (
    <>
      <BottomModal ref={albumDetailsModalRef} height={"50%"}>
        <BottomSheetView style={{ overflow: "visible" }}>
          {selectedAlbum && <AlbumDetailsModalContents album={selectedAlbum} />}
        </BottomSheetView>
      </BottomModal>

      <BottomModal ref={optionsModalRef} height={"60%"}>
        <BottomSheetView style={styles.optionsContainer}>
          <ThemedText style={styles.modalTitle}>Einstellungen</ThemedText>
          <View>
            <ThemedText>Sortieren nach</ThemedText>
            <OptionRow
              label="Gehört am"
              selected={sortMode === "listenedDate"}
              onPress={() => dispatch(setSortMode("listenedDate"))}
            />

            <OptionRow
              label="Veröffentlicht am"
              selected={sortMode === "releaseDate"}
              onPress={() => dispatch(setSortMode("releaseDate"))}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 14,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText>Nur gehörte Alben anzeigen</ThemedText>
            <Switch
              value={!showAllAlbums}
              onValueChange={(value) => {
                dispatch(setShowAllAlbums(!value));
              }}
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
      <BottomModal ref={openAlbumModalRef} height={"40%"}>
        {selectedAlbum && <MusicProviderList album={selectedAlbum} />}
      </BottomModal>
    </>
  );
}

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

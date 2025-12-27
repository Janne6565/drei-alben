import {
  setFilteredCharacters,
  setSortDirection,
  setSortMode,
  toggleShowAllAlbums,
} from "@/features/historySettings/historySettings.slice";
import { HistorySortMode } from "@/features/historySettings/historySettings.types";
import { useCharacterCounts } from "@/hooks/use-character-counts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AlbumDto } from "@/types/albums";
import { shortenString } from "@/util/string-utils";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AlbumDetailsModalContents from "../AlbumDisplay/AlbumDetailsModalContents";
import { MusicProviderList } from "../AlbumDisplay/MusicOpenModal/MusicOpenModal";
import { OptionRow } from "../OptionRow";
import { PrimaryButton } from "../PrimaryButton";
import { ThemedText } from "../themed-text";
import BottomModal from "../ui/bottom-modal";
import { MultiValueSelect } from "../ui/multi-value-select";

type OnChangeType = (value: string[] | ((prev: string[]) => string[])) => void;

type HistoryModalsProps = {
  albumDetailsModalRef: React.RefObject<BottomSheetModal | null>;
  optionsModalRef: React.RefObject<BottomSheetModal | null>;
  openAlbumModalRef: React.RefObject<BottomSheetModal | null>;
  filterModalRef: React.RefObject<BottomSheetModal | null>;
  selectedAlbum: AlbumDto | null;
  openClearAllModal: () => void;
};

export function HistoryModals({
  albumDetailsModalRef,
  optionsModalRef,
  openAlbumModalRef,
  filterModalRef,
  selectedAlbum,
  openClearAllModal,
}: HistoryModalsProps) {
  const { showAllAlbums } = useAppSelector((state) => state.historySettings);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { sortDirection, sortMode } = useAppSelector(
    (state) => state.historySettings
  );
  const { filteredCharacters } = useAppSelector(
    (state) => state.historySettings
  );
  const narratorsClean = useAppSelector((state) => state.narrators.data);
  const characterCounts = useCharacterCounts();
  const narrators = useMemo(
    () =>
      [...narratorsClean].sort(
        (a, b) =>
          (characterCounts[b.character] ?? 0) -
          (characterCounts[a.character] ?? 0)
      ),
    [characterCounts, narratorsClean]
  );
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

  const setFilteredCharactersInternal: OnChangeType = (newVal) => {
    dispatch(
      setFilteredCharacters(
        typeof newVal === "function" ? newVal(filteredCharacters) : newVal
      )
    );
  };

  return (
    <>
      <BottomModal ref={albumDetailsModalRef} height={"50%"}>
        {selectedAlbum && <AlbumDetailsModalContents album={selectedAlbum} />}
      </BottomModal>

      <BottomModal ref={optionsModalRef} height={"60%"} asChild>
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
      <BottomModal ref={openAlbumModalRef} height={"25%"} asChild>
        {selectedAlbum && <MusicProviderList album={selectedAlbum} />}
      </BottomModal>

      <BottomModal ref={filterModalRef} height={"50%"} asChild>
        <BottomSheetView
          style={[styles.optionsContainer, { paddingBottom: insets.bottom }]}
        >
          <ThemedText style={styles.modalTitle}>Filter</ThemedText>
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
              onValueChange={() => {
                dispatch(toggleShowAllAlbums());
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 14,
              justifyContent: "space-between",
            }}
          >
            <ThemedText style={{ opacity: 0.7 }}>
              Alben filtern durch Personen
            </ThemedText>
            <MultiValueSelect
              options={narrators
                .filter((narr) => characterCounts[narr.character] > 0)
                .map((narr) => {
                  const narrLabel = shortenString(narr.character, 15);
                  return {
                    label:
                      narrLabel + " (" + characterCounts[narr.character] + ")",
                    value: narr,
                  };
                })}
              value={Object.fromEntries(
                filteredCharacters?.map((opt) => [opt, true]) ?? []
              )}
              onChange={setFilteredCharactersInternal}
              keyExtractor={(item) => item.character}
              label={
                Object.values(characterCounts).filter((val) => val > 0).length +
                " Personen..."
              }
            />
          </View>
        </BottomSheetView>
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

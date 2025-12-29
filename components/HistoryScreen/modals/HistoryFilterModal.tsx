import {
  setFilteredCharacters,
  toggleShowAllAlbums,
} from "@/features/historySettings/historySettings.slice";
import { closeHistoryFilterModal } from "@/features/modals/modals.slice";
import { useCharacterCounts } from "@/hooks/use-character-counts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { shortenString } from "@/util/string-utils";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../../themed-text";
import BottomModal from "../../ui/bottom-modal";
import { MultiValueSelect } from "../../ui/multi-value-select";

type OnChangeType = (value: string[] | ((prev: string[]) => string[])) => void;

export function HistoryFilterModal() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modals.historyFilter);
  const { showAllAlbums, filteredCharacters } = useAppSelector(
    (state) => state.historySettings
  );
  const narratorsClean = useAppSelector((state) => state.narrators.data);
  const characterCounts = useCharacterCounts();
  const insets = useSafeAreaInsets();
  const filterModalRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (isOpen) {
      filterModalRef.current?.present();
    } else {
      filterModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const onDismiss = () => {
    dispatch(closeHistoryFilterModal());
  };

  const narrators = useMemo(
    () =>
      [...narratorsClean].sort(
        (a, b) =>
          (characterCounts[b.character] ?? 0) -
          (characterCounts[a.character] ?? 0)
      ),
    [characterCounts, narratorsClean]
  );

  const setFilteredCharactersInternal: OnChangeType = (newVal) => {
    dispatch(
      setFilteredCharacters(
        typeof newVal === "function" ? newVal(filteredCharacters) : newVal
      )
    );
  };

  return (
    <BottomModal
      ref={filterModalRef}
      height={"50%"}
      onDismiss={onDismiss}
      asChild
    >
      <BottomSheetView
        style={[styles.optionsContainer, { paddingBottom: insets.bottom }]}
      >
        <ThemedText style={styles.modalTitle}>Filter</ThemedText>
        <View
          style={{
            flexDirection: "column",
            gap: 14,
            justifyContent: "space-between",
          }}
        >
          <View>
            <ThemedText style={{ opacity: 0.7 }}>
              Alben durch Titel filtern
            </ThemedText>
          </View>

          <View style={styles.option}>
            <ThemedText style={styles.optionHeader}>
              Alben durch Personen filtern
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
              searchStringExtractor={(nar) => nar.character}
            />
          </View>
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
            onValueChange={() => {
              dispatch(toggleShowAllAlbums());
            }}
          />
        </View>
      </BottomSheetView>
    </BottomModal>
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
  option: { gap: 5 },
  optionHeader: { opacity: 0.7 },
});

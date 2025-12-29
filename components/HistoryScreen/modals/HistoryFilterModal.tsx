import TextInput from "@/components/ui/text-input";
import {
  setAlbumNameFilter,
  setFilteredCharacters,
  setShowAllAlbums,
} from "@/features/historySettings/historySettings.slice";
import { closeHistoryFilterModal } from "@/features/modals/modals.slice";
import { useCharacterCounts } from "@/hooks/use-character-counts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { shortenString } from "@/util/string-utils";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Keyboard, Pressable, StyleSheet, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../../themed-text";
import BottomModal from "../../ui/bottom-modal";
import { MultiValueSelect } from "../../ui/multi-value-select";

type OnChangeType = (value: string[] | ((prev: string[]) => string[])) => void;

export function HistoryFilterModal() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modals.historyFilter);
  const { showAllAlbums, filteredCharacters, albumNameFilter } = useAppSelector(
    (state) => state.historySettings
  );
  const [searchString, setSearchString] = useState("");
  const narratorsClean = useAppSelector((state) => state.narrators.data);
  const characterCounts = useCharacterCounts();
  const insets = useSafeAreaInsets();
  const filterModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isOpen) {
      filterModalRef.current?.present();
    } else {
      filterModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const onDismiss = () => {
    Keyboard.dismiss();
    submitAlbumNameFilter();
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

  const submitAlbumNameFilter = useCallback(() => {
    dispatch(setAlbumNameFilter(searchString));
  }, [dispatch, searchString]);

  return (
    <BottomModal
      ref={filterModalRef}
      height={"50%"}
      snapPoints={["80%"]}
      onDismiss={onDismiss}
      asChild
    >
      <BottomSheetView style={[{ paddingBottom: insets.bottom }]}>
        <Pressable onPress={Keyboard.dismiss} style={[styles.optionsContainer]}>
          <ThemedText style={styles.modalTitle}>Filter</ThemedText>
          <View
            style={{
              flexDirection: "column",
              gap: 14,
              justifyContent: "space-between",
            }}
          >
            <View style={styles.option}>
              <ThemedText style={styles.optionHeader}>
                Folgen durch Titel filtern
              </ThemedText>

              <TextInput
                placeholder="Folgentitel..."
                style={{
                  width: "100%",
                  marginTop: 0,
                }}
                autoCorrect={false}
                defaultValue={albumNameFilter}
                onChangeText={(updatedText) => {
                  setSearchString(updatedText);
                }}
                onFocus={() => {
                  filterModalRef.current?.snapToIndex(1);
                }}
                onEndEditing={() => {
                  submitAlbumNameFilter();
                  filterModalRef.current?.snapToIndex(0);
                }}
              />
            </View>

            <View style={styles.option}>
              <ThemedText style={styles.optionHeader}>
                Folgen durch Personen filtern
              </ThemedText>
              <MultiValueSelect
                options={narrators
                  .filter((narr) => characterCounts[narr.character] > 0)
                  .map((narr) => {
                    const narrLabel = shortenString(narr.character, 15);
                    return {
                      label:
                        narrLabel +
                        " (" +
                        characterCounts[narr.character] +
                        ")",
                      value: narr,
                    };
                  })}
                value={Object.fromEntries(
                  filteredCharacters?.map((opt) => [opt, true]) ?? []
                )}
                onOpen={Keyboard.dismiss}
                onChange={setFilteredCharactersInternal}
                keyExtractor={(item) => item.character}
                label={
                  Object.values(characterCounts).filter((val) => val > 0)
                    .length + " Personen..."
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
              key={showAllAlbums ? "noAll" : "all"}
              onValueChange={() => {
                dispatch(setShowAllAlbums(!showAllAlbums));
              }}
            />
          </View>
        </Pressable>
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

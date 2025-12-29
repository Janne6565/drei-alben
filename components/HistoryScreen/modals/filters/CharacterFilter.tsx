import { ThemedText } from "@/components/themed-text";
import { MultiValueSelect } from "@/components/ui/multi-value-select";
import {
  setFilteredCharacters,
  setFilteredCharactersMode,
} from "@/features/historySettings/historySettings.slice";
import { useCharacterCounts } from "@/hooks/use-character-counts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { shortenString } from "@/util/string-utils";
import React, { useMemo } from "react";
import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";

type OnChangeType = (value: string[] | ((prev: string[]) => string[])) => void;

const CharacterFilter = () => {
  const dispatch = useAppDispatch();
  const { filteredCharacters, filteredCharactersMode } = useAppSelector(
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

  const setFilteredCharactersInternal: OnChangeType = (newVal) => {
    dispatch(
      setFilteredCharacters(
        typeof newVal === "function" ? newVal(filteredCharacters) : newVal
      )
    );
  };

  return (
    <View style={styles.option}>
      <ThemedText style={styles.optionHeader}>
        Folgen durch Personen filtern
      </ThemedText>
      <MultiValueSelect
        style={{ paddingRight: 10 }}
        options={(filteredCharactersMode === "AND"
          ? narrators.filter((narr) => characterCounts[narr.character] > 0)
          : narrators
        ).map((narr) => {
          const narrLabel = shortenString(narr.character, 15);
          return {
            label:
              narrLabel +
              " (" +
              (filteredCharactersMode === "AND"
                ? characterCounts[narr.character]
                : narr.count) +
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
          (filteredCharactersMode === "AND"
            ? Object.values(characterCounts).filter((val) => val > 0).length
            : narratorsClean.length) + " Personen..."
        }
        searchStringExtractor={(nar) => nar.character}
        endDecorrator={
          <TouchableOpacity
            onPress={() =>
              dispatch(
                setFilteredCharactersMode(
                  filteredCharactersMode === "AND" ? "OR" : "AND"
                )
              )
            }
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 25,
            }}
          >
            <ThemedText>
              {filteredCharactersMode === "AND" ? "UND" : "ODER"}
            </ThemedText>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  option: { gap: 5 },
  optionHeader: { opacity: 0.7 },
});

export default CharacterFilter;

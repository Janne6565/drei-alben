import TextInput from "@/components/ui/text-input";
import { ThemedText } from "@/components/themed-text";
import React from "react";
import { StyleSheet, View } from "react-native";

type AlbumNameFilterProps = {
  snapTo: (index: number) => void;
  searchString: string;
  onChangeText: (text: string) => void;
  onEndEditing: () => void;
};

export function AlbumNameFilter({
  snapTo,
  searchString,
  onChangeText,
  onEndEditing,
}: AlbumNameFilterProps) {
  return (
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
        value={searchString}
        onChangeText={onChangeText}
        onFocus={() => {
          snapTo(1);
        }}
        onEndEditing={onEndEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  option: { gap: 5 },
  optionHeader: { opacity: 0.7 },
});

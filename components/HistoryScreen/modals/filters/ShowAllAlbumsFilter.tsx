import { ThemedText } from "@/components/themed-text";
import { setShowAllAlbums } from "@/features/historySettings/historySettings.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";

const ShowAllAlbumsFilter = () => {
  const dispatch = useAppDispatch();
  const { showAllAlbums } = useAppSelector((state) => state.historySettings);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.optionHeader}>
        Nur gehörte Alben anzeigen
      </ThemedText>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <ThemedText>Filter aktiv: </ThemedText>
        <Switch
          value={!showAllAlbums}
          key={showAllAlbums ? "noAll" : "all"}
          onValueChange={() => {
            dispatch(setShowAllAlbums(!showAllAlbums));
          }}
          style={{ alignSelf: "center" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionHeader: { opacity: 0.7 },
  option: { gap: 5 },
  container: {
    gap: 5,
  },
});

export default ShowAllAlbumsFilter;

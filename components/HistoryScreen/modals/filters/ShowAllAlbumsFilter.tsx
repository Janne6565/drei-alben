import { ThemedText } from "@/components/themed-text";
import { setShowAllAlbums } from "@/features/historySettings/historySettings.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";

export function ShowAllAlbumsFilter() {
  const dispatch = useAppDispatch();
  const { showAllAlbums } = useAppSelector((state) => state.historySettings);

  return (
    <View style={styles.container}>
      <ThemedText>Nur gehörte Alben anzeigen</ThemedText>
      <Switch
        value={!showAllAlbums}
        key={showAllAlbums ? "noAll" : "all"}
        onValueChange={() => {
          dispatch(setShowAllAlbums(!showAllAlbums));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

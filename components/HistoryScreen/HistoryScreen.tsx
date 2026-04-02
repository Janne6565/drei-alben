import {ThemedText} from "@/components/themed-text";
import {ThemedView} from "@/components/themed-view";
import {useFilteredAlbums} from "@/hooks/use-filtered-albums";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {HistoryAlbumList} from "./HistoryAlbumList";
import {HistoryHeader} from "./HistoryHeader";
import {HistoryProgress} from "./HistoryProgress";
import HistoryFilterModal from "./modals/HistoryFilterModal";
import HistoryInfoModal from "./modals/HistoryInfoModal";
import HistoryOptionsModal from "./modals/HistoryOptionsModal";

export const HistoryScreen = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const filteredAlbums = useFilteredAlbums();
  const {seenAlbums} = useAppSelector((state) => state.sessionData.data);
  const seenAlbumsCount = filteredAlbums.filter(
    (album) => !!seenAlbums[album.id]
  ).length;

  return (
    <ThemedView style={[styles.container, {paddingTop: insets.top}]}>
      <HistoryHeader/>
      <View style={styles.titleRow}>
        <ThemedText style={styles.title}>Historie</ThemedText>
      </View>
      {filteredAlbums.length > 0 && (
        <HistoryProgress
          totalAlbums={filteredAlbums.length}
          seenAlbumsCount={seenAlbumsCount}
        />
      )}
      <HistoryAlbumList albums={filteredAlbums}/>

      <HistoryOptionsModal/>
      <HistoryFilterModal/>
      <HistoryInfoModal/>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

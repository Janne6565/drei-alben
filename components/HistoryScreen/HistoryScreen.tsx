import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useFilteredAlbums } from "@/hooks/use-filtered-albums";
import { useAppSelector } from "@/store/hooks";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HistoryAlbumList } from "./HistoryAlbumList";
import { HistoryHeader } from "./HistoryHeader";
import { HistoryProgress } from "./HistoryProgress";
import HistoryFilterModal from "./modals/HistoryFilterModal";
import HistoryOptionsModal from "./modals/HistoryOptionsModal";

export const HistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const filteredAlbums = useFilteredAlbums();
  const { seenAlbums } = useAppSelector((state) => state.sessionData.data);
  const seenAlbumsCount = filteredAlbums.filter(
    (album) => !!seenAlbums[album.id]
  ).length;

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <HistoryHeader />
      <ThemedText style={styles.title}>Historie</ThemedText>
      {filteredAlbums.length > 0 && (
        <HistoryProgress
          totalAlbums={filteredAlbums.length}
          seenAlbumsCount={seenAlbumsCount}
        />
      )}
      <HistoryAlbumList albums={filteredAlbums} />

      <HistoryOptionsModal />
      <HistoryFilterModal />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 5,
  },
});

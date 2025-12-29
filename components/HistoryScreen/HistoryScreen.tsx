import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useFilteredAlbums } from "@/hooks/use-filtered-albums";
import { useAppSelector } from "@/store/hooks";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AlbumDetailsModal } from "./modals/AlbumDetailsModal";
import { HistoryFilterModal } from "./modals/HistoryFilterModal";
import { HistoryOptionsModal } from "./modals/HistoryOptionsModal";
import { OpenAlbumModal } from "./modals/OpenAlbumModal";
import { HistoryAlbumList } from "./HistoryAlbumList";
import { HistoryHeader } from "./HistoryHeader";
import { HistoryProgress } from "./HistoryProgress";

export const HistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const seenAlbumsData = useFilteredAlbums();
  const { seenAlbums } = useAppSelector((state) => state.sessionData.data);
  const seenAlbumsCount = seenAlbumsData.filter(
    (album) => !!seenAlbums[album.id]
  ).length;

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <HistoryHeader />
      <ThemedText style={styles.title}>Historie</ThemedText>
      {seenAlbumsData.length > 0 && (
        <HistoryProgress
          totalAlbums={seenAlbumsData.length}
          seenAlbumsCount={seenAlbumsCount}
        />
      )}
      <HistoryAlbumList albums={seenAlbumsData} />

      <AlbumDetailsModal />
      <HistoryOptionsModal />
      <HistoryFilterModal />
      <OpenAlbumModal />
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
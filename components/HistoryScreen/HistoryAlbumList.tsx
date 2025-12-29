import { ThemedText } from "@/components/themed-text";
import { setAlbums } from "@/features/albums/albums.slice";
import { fetchAlbums } from "@/features/albums/albums.utils";
import { openAlbumDetailsModal, openMusicProviderModal } from "@/features/modals/modals.slice";
import { setNarrators } from "@/features/narrators/narrators.slice";
import { dismissAlbum } from "@/features/sessionData/sessionData.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AlbumDto } from "@/types/albums";
import { assertUserConfirmation } from "@/util/assert-user-confirmation";
import { useState } from "react";
import { RefreshControl, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HistoryScreenAlbumColumn } from "./HistoryScreenAlbumColumn";

export const HistoryAlbumList = ({ albums }: { albums: AlbumDto[] }) => {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { seenAlbums } = useAppSelector((state) => state.sessionData.data);

  const refreshAlbums = async () => {
    setRefreshing(true);
    const { albums, narrators } = await fetchAlbums();
    dispatch(setAlbums(albums));
    dispatch(setNarrators(narrators));
    setRefreshing(false);
  };

  const openRemoveConfirmationModal = (album: AlbumDto) => {
    assertUserConfirmation({
      title: "Bestätigen",
      message: `Möchtest du "${album.name}" wirklich aus deiner Historie entfernen?`,
      onConfirm: () => dispatch(dismissAlbum(album.id)),
      confirmationText: "Entfernen",
    });
  };

  if (albums.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Keine gehörten Alben</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={albums}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshAlbums} />
      }
      renderItem={({ item }) => (
        <HistoryScreenAlbumColumn
          item={item}
          seenAlbums={seenAlbums}
          openDetailsModal={(album) =>
            dispatch(openAlbumDetailsModal(album.id))
          }
          openModal={openRemoveConfirmationModal}
          openAlbumModal={(album) => dispatch(openMusicProviderModal(album.id))}
        />
      )}
      keyExtractor={(alb) => alb.id}
    />
  );
};

import { View } from "react-native";

import AlreadySeenButton from "@/components/AlbumButtons/AlreadySeenButton";
import OpenAlbumButton from "@/components/AlbumButtons/OpenAlbumButton";
import RefreshAlbumButton from "@/components/AlbumButtons/RefreshAlbumButton";
import AlbumDisplay from "@/components/AlbumDisplay/AlbumDisplay";
import GenericPage from "@/components/generic-page";
import { ThemedView } from "@/components/themed-view";
import { fetchAlbums } from "@/features/albums/albums.thunks";
import useSessionData from "@/features/sessionData/sessionData.hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useMemo } from "react";

export default function AlbumsScreen() {
  const dispatch = useAppDispatch();
  const { data: albums, status } = useAppSelector((state) => state.albums);
  const { pickNewAlbum } = useSessionData();

  const { currentAlbumId } = useAppSelector((state) => state.sessionData.data);
  const currentAlbum = useMemo(
    () => albums.find((album) => album.id === currentAlbumId),
    [albums, currentAlbumId]
  );

  useEffect(() => {
    if (status === "idle" && albums.length === 0) {
      dispatch(fetchAlbums());
    }
  }, [status, albums.length, dispatch]);

  useEffect(() => {
    if (currentAlbumId === "") {
      pickNewAlbum();
    }
  }, [currentAlbumId, pickNewAlbum]);

  return (
    <GenericPage style={{ paddingTop: 90 }}>
      <ThemedView style={{ paddingBottom: 80 }}>
        {currentAlbum && <AlbumDisplay album={currentAlbum} />}
      </ThemedView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <AlreadySeenButton />
        <OpenAlbumButton album={currentAlbum} />
        <RefreshAlbumButton />
      </View>
    </GenericPage>
  );
}

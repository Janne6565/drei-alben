import AlreadySeenButton from "@/components/AlbumButtons/AlreadySeenButton";
import OpenAlbumButton from "@/components/AlbumButtons/OpenAlbumButton";
import RefreshAlbumButton from "@/components/AlbumButtons/RefreshAlbumButton";
import AlbumDisplay from "@/components/AlbumDisplay/AlbumDisplay";
import { ThemedView } from "@/components/themed-view";
import {
  openAlbumDetailsModal,
  openMusicProviderModal,
} from "@/features/modals/modals.slice";
import { useAppDispatch } from "@/store/hooks";
import { AlbumDto } from "@/types/albums";
import { useCallback } from "react";
import { View } from "react-native";

export const AlbumSuggestion = ({ album }: { album: AlbumDto }) => {
  const dispatch = useAppDispatch();

  const openProviders = useCallback(() => {
    dispatch(openMusicProviderModal(album.id));
  }, [dispatch, album]);

  const openDescriptionModal = useCallback(() => {
    dispatch(openAlbumDetailsModal(album.id));
  }, [dispatch, album]);

  return (
    <ThemedView>
      <AlbumDisplay album={album} onPress={openDescriptionModal} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
          marginTop: 25,
        }}
      >
        <AlreadySeenButton />
        <OpenAlbumButton onPress={openProviders} />
        <RefreshAlbumButton />
      </View>
    </ThemedView>
  );
};

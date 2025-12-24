import { View } from "react-native";

import AlreadySeenButton from "@/components/AlbumButtons/AlreadySeenButton";
import OpenAlbumButton from "@/components/AlbumButtons/OpenAlbumButton";
import RefreshAlbumButton from "@/components/AlbumButtons/RefreshAlbumButton";
import AlbumDisplay from "@/components/AlbumDisplay/AlbumDisplay";
import { MusicProviderList } from "@/components/AlbumDisplay/MusicOpenModal/MusicOpenModal";
import GenericPage from "@/components/generic-page";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { fetchAlbums } from "@/features/albums/albums.thunks";
import useSessionData from "@/features/sessionData/sessionData.hooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

export default function AlbumsScreen() {
  const providersModalRef = useRef<BottomSheetModal>(null);
  const descriptionModalRef = useRef<BottomSheetModal>(null);

  const openProviders = useCallback(() => {
    providersModalRef.current?.present();
  }, []);

  const openDescriptionModal = useCallback(() => {
    descriptionModalRef.current?.present();
  }, []);

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
    <>
      <GenericPage style={{ paddingTop: 90 }}>
        <ThemedView>
          {currentAlbum && (
            <AlbumDisplay
              album={currentAlbum}
              onDescriptionClick={openDescriptionModal}
            />
          )}
        </ThemedView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <AlreadySeenButton />
          <OpenAlbumButton onPress={openProviders} />
          <RefreshAlbumButton />
        </View>
      </GenericPage>
      <BottomSheetModal
        ref={providersModalRef}
        backgroundStyle={{ backgroundColor: "#121212" }}
        handleIndicatorStyle={{ backgroundColor: "#444", width: 40 }}
      >
        {currentAlbum && <MusicProviderList album={currentAlbum} />}
      </BottomSheetModal>
      <BottomSheetModal
        ref={descriptionModalRef}
        backgroundStyle={{ backgroundColor: "#121212" }}
        handleIndicatorStyle={{ backgroundColor: "#444", width: 40 }}
      >
        <BottomSheetView style={{ padding: 15, paddingTop: 3 }}>
          <ThemedText>{currentAlbum?.description}</ThemedText>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

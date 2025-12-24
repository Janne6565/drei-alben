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
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function AlbumsScreen() {
  const modalRef = useRef<BottomSheetModal>(null);
  const [mode, setMode] = useState<"details" | "open" | null>(null);

  const openDetails = () => {
    setMode("details");
    modalRef.current?.present();
  };

  const openProviders = () => {
    setMode("open");
    modalRef.current?.present();
  };

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
              onDescriptionClick={openDetails}
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
        <ThemedText>{mode}</ThemedText>
      </GenericPage>

      <BottomSheetModal
        ref={modalRef}
        snapPoints={["50%"]}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: "#121212" }}
        handleIndicatorStyle={{ backgroundColor: "#444", width: 40 }}
      >
        {mode === "details" && (
          <ThemedText
            style={{
              padding: 15,
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {currentAlbum?.description}
          </ThemedText>
        )}
        {mode === "open" && <MusicProviderList album={currentAlbum!} />}
      </BottomSheetModal>
    </>
  );
}

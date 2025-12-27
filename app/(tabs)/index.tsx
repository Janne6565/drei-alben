import { View } from "react-native";

import AlreadySeenButton from "@/components/AlbumButtons/AlreadySeenButton";
import OpenAlbumButton from "@/components/AlbumButtons/OpenAlbumButton";
import RefreshAlbumButton from "@/components/AlbumButtons/RefreshAlbumButton";
import AlbumDetailsModalContents from "@/components/AlbumDisplay/AlbumDetailsModalContents";
import AlbumDisplay from "@/components/AlbumDisplay/AlbumDisplay";
import { MusicProviderList } from "@/components/AlbumDisplay/MusicOpenModal/MusicOpenModal";
import GenericPage from "@/components/generic-page";
import { ThemedView } from "@/components/themed-view";
import BottomModal from "@/components/ui/bottom-modal";
import useSessionData from "@/features/sessionData/sessionData.hooks";
import { useAppSelector } from "@/store/hooks";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AlbumsScreen() {
  const inset = useSafeAreaInsets();
  const providersModalRef = useRef<BottomSheetModal>(null);
  const descriptionModalRef = useRef<BottomSheetModal>(null);

  const openProviders = useCallback(() => {
    providersModalRef.current?.present();
  }, []);

  const openDescriptionModal = useCallback(() => {
    descriptionModalRef.current?.present();
  }, []);

  const { data: albums } = useAppSelector((state) => state.albums);
  const { pickNewAlbum } = useSessionData();

  const { currentAlbumId } = useAppSelector((state) => state.sessionData.data);
  const currentAlbum = useMemo(
    () => albums?.find((album) => album.id === currentAlbumId),
    [albums, currentAlbumId]
  );

  useEffect(() => {
    if (currentAlbumId === "") {
      pickNewAlbum();
    }
  }, [currentAlbumId, pickNewAlbum]);

  return (
    <>
      <GenericPage
        style={{
          paddingTop: inset.top,
          flex: 1,
          height: "100%",
          justifyContent: "center",
          gap: 25,
        }}
      >
        <ThemedView>
          {currentAlbum && (
            <AlbumDisplay album={currentAlbum} onPress={openDescriptionModal} />
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
      <BottomModal ref={providersModalRef} height={"25%"} asChild>
        {currentAlbum && <MusicProviderList album={currentAlbum} />}
      </BottomModal>
      <BottomModal ref={descriptionModalRef} height={"60%"}>
        {currentAlbum && <AlbumDetailsModalContents album={currentAlbum} />}
      </BottomModal>
    </>
  );
}

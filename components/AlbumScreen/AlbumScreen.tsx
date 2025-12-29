import GenericPage from "@/components/generic-page";
import useSessionData from "@/features/sessionData/sessionData.hooks";
import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AlbumSuggestion } from "./AlbumSuggestion";

export default function AlbumsScreen() {
  const inset = useSafeAreaInsets();
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
        {currentAlbum && <AlbumSuggestion album={currentAlbum} />}
      </GenericPage>
    </>
  );
}

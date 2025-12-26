import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pickRandom } from "@/util/array-util";
import { useCallback } from "react";
import { setCurrentAlbum } from "./sessionData.slice";

const useSessionData = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector((state) => state.albums.data);
  const { currentAlbumId, seenAlbums } = useAppSelector(
    (state) => state.sessionData.data
  );

  const pickNewAlbum = useCallback(() => {
    const filteredAlbums = albums.filter((album) => {
      if (currentAlbumId === album.id) {
        return false;
      }
      if (Object.keys(seenAlbums).includes(album.id)) {
        return !seenAlbums[album.id];
      }
      return true;
    });

    const randomAlbum = pickRandom(filteredAlbums);

    if (!randomAlbum) {
      return;
    }

    dispatch(setCurrentAlbum(randomAlbum.id));
  }, [albums, currentAlbumId, dispatch, seenAlbums]);

  return { pickNewAlbum };
};

export default useSessionData;

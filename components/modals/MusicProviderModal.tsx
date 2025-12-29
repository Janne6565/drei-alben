import { findAlbumById } from "@/features/albums/albums.selectors";
import {
  closeMusicProviderModal,
} from "@/features/modals/modals.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { MusicProviderList } from "../AlbumDisplay/MusicOpenModal/MusicOpenModal";
import BottomModal from "../ui/bottom-modal";

export function MusicProviderModal() {
  const dispatch = useAppDispatch();
  const { isOpen, albumId } = useAppSelector((state) => state.modals.musicProvider);
  const album = useAppSelector((state) => findAlbumById(state, albumId));
  const openAlbumModalRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (isOpen) {
      openAlbumModalRef.current?.present();
    } else {
      openAlbumModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const onDismiss = () => {
    dispatch(closeMusicProviderModal());
  };

  return (
    <BottomModal ref={openAlbumModalRef} height={"25%"} onDismiss={onDismiss} asChild>
      {album && <MusicProviderList album={album} />}
    </BottomModal>
  );
}

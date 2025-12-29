import { findAlbumById } from "@/features/albums/albums.selectors";
import {
  closeOpenAlbumModal,
} from "@/features/modals/modals.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { MusicProviderList } from "../../AlbumDisplay/MusicOpenModal/MusicOpenModal";
import BottomModal from "../../ui/bottom-modal";

export function OpenAlbumModal() {
  const dispatch = useAppDispatch();
  const { isOpen, albumId } = useAppSelector((state) => state.modals.openAlbum);
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
    dispatch(closeOpenAlbumModal());
  };

  return (
    <BottomModal ref={openAlbumModalRef} height={"25%"} onDismiss={onDismiss} asChild>
      {album && <MusicProviderList album={album} />}
    </BottomModal>
  );
}

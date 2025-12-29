import {
  closeAlbumDetailsModal,
  openAlbumDetailsModal,
} from "@/features/modals/modals.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import AlbumDetailsModalContents from "../../AlbumDisplay/AlbumDetailsModalContents";
import BottomModal from "../../ui/bottom-modal";
import { findAlbumById } from "@/features/albums/albums.selectors";

export function AlbumDetailsModal() {
  const dispatch = useAppDispatch();
  const {
    isOpen,
    albumId,
  } = useAppSelector((state) => state.modals.albumDetails);
  const album = useAppSelector((state) => findAlbumById(state, albumId));
  const albumDetailsModalRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (isOpen) {
      albumDetailsModalRef.current?.present();
    } else {
      albumDetailsModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const onDismiss = () => {
    dispatch(closeAlbumDetailsModal());
  };

  return (
    <BottomModal ref={albumDetailsModalRef} height={"50%"} onDismiss={onDismiss}>
      {album && <AlbumDetailsModalContents album={album} />}
    </BottomModal>
  );
}

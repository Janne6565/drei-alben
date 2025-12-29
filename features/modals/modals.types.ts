export type ModalState = {
  albumDetails: {
    isOpen: boolean;
    albumId: string | null;
  };
  historyOptions: {
    isOpen: boolean;
  };
  historyFilter: {
    isOpen: boolean;
  };
  openAlbum: {
    isOpen: boolean;
    albumId: string | null;
  };
};

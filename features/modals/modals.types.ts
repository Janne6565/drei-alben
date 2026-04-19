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
  historyInfo: {
    isOpen: boolean;
  };
  musicProvider: {
    isOpen: boolean;
    albumId: string | null;
  };
  ratingModal: {
    isOpen: boolean;
    albumId: string | null;
    shouldPickNewAlbum: boolean;
  };
};

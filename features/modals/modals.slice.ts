import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "./modals.types";

const initialState: ModalState = {
  albumDetails: {
    isOpen: false,
    albumId: null,
  },
  historyOptions: {
    isOpen: false,
  },
  historyFilter: {
    isOpen: false,
  },
  openAlbum: {
    isOpen: false,
    albumId: null,
  },
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openAlbumDetailsModal: (state, action: PayloadAction<string>) => {
      state.albumDetails.isOpen = true;
      state.albumDetails.albumId = action.payload;
    },
    closeAlbumDetailsModal: (state) => {
      state.albumDetails.isOpen = false;
      state.albumDetails.albumId = null;
    },
    openHistoryOptionsModal: (state) => {
      state.historyOptions.isOpen = true;
    },
    closeHistoryOptionsModal: (state) => {
      state.historyOptions.isOpen = false;
    },
    openHistoryFilterModal: (state) => {
      state.historyFilter.isOpen = true;
    },
    closeHistoryFilterModal: (state) => {
      state.historyFilter.isOpen = false;
    },
    openOpenAlbumModal: (state, action: PayloadAction<string>) => {
      state.openAlbum.isOpen = true;
      state.openAlbum.albumId = action.payload;
    },
    closeOpenAlbumModal: (state) => {
      state.openAlbum.isOpen = false;
      state.openAlbum.albumId = null;
    },
  },
});

export const {
  openAlbumDetailsModal,
  closeAlbumDetailsModal,
  openHistoryOptionsModal,
  closeHistoryOptionsModal,
  openHistoryFilterModal,
  closeHistoryFilterModal,
  openOpenAlbumModal,
  closeOpenAlbumModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;

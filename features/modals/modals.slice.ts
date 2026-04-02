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
  historyInfo: {
    isOpen: false,
  },
  musicProvider: {
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
    openHistoryInfoModal: (state) => {
      state.historyInfo.isOpen = true;
    },
    closeHistoryInfoModal: (state) => {
      state.historyInfo.isOpen = false;
    },
    openMusicProviderModal: (state, action: PayloadAction<string>) => {
      state.musicProvider.isOpen = true;
      state.musicProvider.albumId = action.payload;
    },
    closeMusicProviderModal: (state) => {
      state.musicProvider.isOpen = false;
      state.musicProvider.albumId = null;
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
  openHistoryInfoModal,
  closeHistoryInfoModal,
  openMusicProviderModal,
  closeMusicProviderModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionDataState } from "./sessionData.types";

const initialState: SessionDataState = {
  data: {
    currentAlbumId: "",
    seenAlbums: {},
  },
};

const sessionData = createSlice({
  name: "albums",
  initialState,
  reducers: {
    reset(state) {
      state.data = {
        currentAlbumId: "",
        seenAlbums: {},
      };
    },
    setCurrentAlbum(state, albumId: PayloadAction<string>) {
      state.data.currentAlbumId = albumId.payload;
    },
    setCurrentAlbumToSeen(state) {
      state.data.seenAlbums[state.data.currentAlbumId] = Date.now();
    },
    dismissAlbum(state, albumId: PayloadAction<string>) {
      delete state.data.seenAlbums[albumId.payload];
    },
    clearSeenAlbums(state) {
      state.data.seenAlbums = {};
    },
  },
});

export const {
  reset,
  setCurrentAlbum,
  setCurrentAlbumToSeen,
  dismissAlbum,
  clearSeenAlbums,
} = sessionData.actions;
export default sessionData.reducer;

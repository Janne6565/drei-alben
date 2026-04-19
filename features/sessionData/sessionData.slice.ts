import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionDataState } from "./sessionData.types";

const initialState: SessionDataState = {
  data: {
    currentAlbumId: "",
    seenAlbums: {},
    albumRatings: {},
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
        albumRatings: {},
      };
    },
    setCurrentAlbum(state, albumId: PayloadAction<string>) {
      state.data.currentAlbumId = albumId.payload;
    },
    setCurrentAlbumToSeen(state) {
      state.data.seenAlbums[state.data.currentAlbumId] = Date.now();
    },
    setAlbumToSeen(state, albumId: PayloadAction<string>) {
      state.data.seenAlbums[albumId.payload] = Date.now();
    },
    dismissAlbum(state, albumId: PayloadAction<string>) {
      delete state.data.seenAlbums[albumId.payload];
    },
    clearSeenAlbums(state) {
      state.data.seenAlbums = {};
    },
    setAlbumRating(
      state,
      action: PayloadAction<{ albumId: string; rating: number }>
    ) {
      state.data.albumRatings[action.payload.albumId] = action.payload.rating;
    },
    removeAlbumRating(state, action: PayloadAction<string>) {
      delete state.data.albumRatings[action.payload];
    },
  },
});

export const {
  reset,
  setCurrentAlbum,
  setCurrentAlbumToSeen,
  dismissAlbum,
  setAlbumToSeen,
  clearSeenAlbums,
  setAlbumRating,
  removeAlbumRating,
} = sessionData.actions;
export default sessionData.reducer;

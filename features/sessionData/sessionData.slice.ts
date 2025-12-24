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
      state.data.seenAlbums[state.data.currentAlbumId] = true;
    },
  },
});

export const { reset, setCurrentAlbum, setCurrentAlbumToSeen } =
  sessionData.actions;
export default sessionData.reducer;

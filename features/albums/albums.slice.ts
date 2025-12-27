import { AlbumDto } from "@/types/albums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAlbums } from "./albums.thunks";
import { AlbumsState } from "./albums.types";

const initialState: AlbumsState = {
  data: [],
  status: "idle",
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    clearAlbums(state) {
      state.data = [];
      state.status = "idle";
    },
    setAlbums(state, payload: PayloadAction<AlbumDto[]>) {
      state.data = payload.payload;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.lastFetchedAt = new Date().toISOString();
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearAlbums, setAlbums } = albumsSlice.actions;
export default albumsSlice.reducer;

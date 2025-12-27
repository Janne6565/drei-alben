import { AlbumDto } from "@/types/albums";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAlbums as fetchAlbumsApi } from "./albums.utils";

export const fetchAlbums = createAsyncThunk<
  AlbumDto[],
  void,
  { rejectValue: string }
>("albums/fetch", async (_, { rejectWithValue }) => {
  try {
    return await fetchAlbumsApi();
  } catch {
    return rejectWithValue("Could not load albums");
  }
});

import { AlbumDto } from "@/types/albums";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAlbums as fetchAlbumsApi } from "./albums.utils";
import { isNetworkConnected } from "@/util/network-util";
import { AlbumsState } from "./albums.types";

export const fetchAlbums = createAsyncThunk<
  AlbumDto[],
  void,
  { rejectValue: string; state: { albums: AlbumsState } }
>("albums/fetch", async (_, { rejectWithValue, getState }) => {
  try {
    const connected = await isNetworkConnected();
    const existingAlbums = getState().albums.data;

    if (!connected && existingAlbums.length > 0) {
      return existingAlbums;
    }

    const { albums } = await fetchAlbumsApi();
    return albums;
  } catch {
    return rejectWithValue("Could not load albums");
  }
});

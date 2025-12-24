import { AlbumDto } from "@/types/albums";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

export const fetchAlbums = createAsyncThunk<
  AlbumDto[],
  void,
  { rejectValue: string }
>("albums/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(API_BASE_URL + "/v1/albums");
    if (!res.ok) throw new Error("Failed to fetch albums");
    return (await res.json()) as AlbumDto[];
  } catch (err) {
    return rejectWithValue("Could not load albums");
  }
});

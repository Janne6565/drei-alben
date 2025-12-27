import { Narrator } from "@/types/albums";
import { getUniqueElements } from "@/util/array-util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAlbums } from "../albums/albums.utils";

export const fetchNarrators = createAsyncThunk<
  Narrator[],
  void,
  { rejectValue: string }
>("narrators/fetch", async (_, { rejectWithValue }) => {
  try {
    const { narrators } = await fetchAlbums();
    const uniques = getUniqueElements(narrators, (narr) => narr.character);
    const withCount = [
      ...uniques.map((narr) => ({ ...narr.item, count: narr.count })),
    ];
    return withCount;
  } catch {
    return rejectWithValue("Could not load albums");
  }
});

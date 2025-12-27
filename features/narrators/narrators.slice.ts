import { Narrator } from "@/types/albums";
import { getUniqueElements } from "@/util/array-util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNarrators } from "./narrators.thunks";
import { NarratorSlice } from "./narrators.types";

const initialState: NarratorSlice = {
  data: [],
  status: "idle",
};

const narratorSlice = createSlice({
  name: "narrators",
  initialState,
  reducers: {
    clearNarrators(state) {
      state.data = [];
    },
    setNarrators(state, payload: PayloadAction<Narrator[]>) {
      state.data = getUniqueElements(
        payload.payload,
        (narr) => narr.character
      ).map((tuple) => ({ ...tuple.item, count: tuple.count }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNarrators.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNarrators.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.lastFetchedAt = new Date().toISOString();
      })
      .addCase(fetchNarrators.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearNarrators, setNarrators } = narratorSlice.actions;
export default narratorSlice.reducer;

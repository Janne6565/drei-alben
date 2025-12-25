import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistorySettings, HistorySortMode } from "./historySettings.types";

const initialState: HistorySettings = {
  sortMode: "releaseDate",
  showAllAlbums: true,
};

const historySettingsSlice = createSlice({
  name: "historySettings",
  initialState,
  reducers: {
    setSortMode: (state, action: PayloadAction<HistorySortMode>) => {
      state.sortMode = action.payload;
    },
    setShowAllAlbums: (state, action: PayloadAction<boolean>) => {
      state.showAllAlbums = action.payload;
    },
  },
});

export const { setSortMode, setShowAllAlbums } = historySettingsSlice.actions;

export default historySettingsSlice.reducer;

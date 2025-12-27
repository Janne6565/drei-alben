import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  HistorySettings,
  HistorySortMode,
  SortDirection,
} from "./historySettings.types";

const initialState: HistorySettings = {
  sortMode: "releaseDate",
  sortDirection: "desc",
  showAllAlbums: true,
};

const historySettingsSlice = createSlice({
  name: "historySettings",
  initialState,
  reducers: {
    setSortMode: (state, action: PayloadAction<HistorySortMode>) => {
      state.sortMode = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    setShowAllAlbums: (state, action: PayloadAction<boolean>) => {
      state.showAllAlbums = action.payload;
    },
  },
});

export const { setSortMode, setShowAllAlbums, setSortDirection } =
  historySettingsSlice.actions;

export default historySettingsSlice.reducer;

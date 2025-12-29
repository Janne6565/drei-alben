import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  HistorySettings,
  HistorySortMode,
  SortDirection,
} from "./historySettings.types";

const initialState: HistorySettings = {
  sortMode: "releaseDate",
  sortDirection: "desc",
  filteredCharacters: [],
  filteredCharactersMode: "AND",
  showAllAlbums: true,
  albumNameFilter: "",
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
    setFilteredCharacters: (state, action: PayloadAction<string[]>) => {
      state.filteredCharacters = action.payload;
    },
    setAlbumNameFilter: (state, action: PayloadAction<string>) => {
      state.albumNameFilter = action.payload;
    },
    setFilteredCharactersMode: (
      state,
      action: PayloadAction<HistorySettings["filteredCharactersMode"]>
    ) => {
      state.filteredCharactersMode = action.payload;
    },
    toggleShowAllAlbums: (state) => {
      state.showAllAlbums = !state.showAllAlbums;
    },
  },
});

export const {
  setSortMode,
  setShowAllAlbums,
  setSortDirection,
  setFilteredCharacters,
  toggleShowAllAlbums,
  setAlbumNameFilter,
  setFilteredCharactersMode,
} = historySettingsSlice.actions;

export default historySettingsSlice.reducer;

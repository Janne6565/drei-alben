export type HistorySortMode = "listenedDate" | "releaseDate";
export type SortDirection = "asc" | "desc";

export interface HistorySettings {
  sortMode: HistorySortMode;
  sortDirection: SortDirection;
  filteredCharacters: string[];
  showAllAlbums: boolean;
}

export type HistorySortMode = "listenedDate" | "releaseDate" | "searchAccuracy";
export type SortDirection = "asc" | "desc";

export interface HistorySettings {
  sortMode: HistorySortMode;
  sortDirection: SortDirection;
  filteredCharacters: string[];
  showAllAlbums: boolean;
  albumNameFilter: string;
}

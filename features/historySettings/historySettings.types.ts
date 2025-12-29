export type HistorySortMode = "listenedDate" | "releaseDate" | "searchAccuracy";
export type SortDirection = "asc" | "desc";

export interface HistorySettings {
  sortMode: HistorySortMode;
  sortDirection: SortDirection;
  filteredCharacters: string[];
  filteredCharactersMode: "AND" | "OR";
  showAllAlbums: boolean;
  albumNameFilter: string;
  startDate: string | null;
  endDate: string | null;
}

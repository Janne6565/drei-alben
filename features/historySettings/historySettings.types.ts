export type HistorySortMode = "listenedDate" | "releaseDate";

export interface HistorySettings {
    sortMode: HistorySortMode;
    showAllAlbums: boolean;
}

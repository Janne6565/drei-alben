import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

const selectAlbums = (state: RootState) => state.albums.data;
const selectSeenAlbums = (state: RootState) => state.sessionData.data.seenAlbums;
const selectHistorySettings = (state: RootState) => state.historySettings;

export const selectFilteredAlbums = createSelector(
  [selectAlbums, selectSeenAlbums, selectHistorySettings],
  (albums, seenAlbums, historySettings) => {
    const { sortMode, showAllAlbums, sortDirection, filteredCharacters } =
      historySettings;

    // 1. Filter by seen status
    const filtered = showAllAlbums
      ? [...albums]
      : albums.filter((album) => seenAlbums[album.id]);

    // 2. Filter by characters
    const characterFiltered =
      !filteredCharacters || filteredCharacters.length === 0
        ? filtered
        : filtered.filter((album) =>
            filteredCharacters.every((character) =>
              album.narrators?.some((narr) => narr.character === character)
            )
          );

    // 3. Sort
    const sorted = characterFiltered.sort((a, b) => {
      let comparison = 0;
      if (sortMode === "releaseDate") {
        comparison = Date.parse(b.release_date) - Date.parse(a.release_date);
      } else {
        // 'listenedDate'
        const aDate = seenAlbums[a.id] || 0;
        const bDate = seenAlbums[b.id] || 0;
        comparison = bDate - aDate;
      }

      return sortDirection === "asc" ? -comparison : comparison;
    });

    return sorted;
  }
);

export const selectCharacterCounts = createSelector(
  [selectFilteredAlbums],
  (filteredAlbums) => {
    const characterCounts: Record<string, number> = {};

    for (const album of filteredAlbums) {
      if (album.narrators) {
        const uniqueCharacters = new Set(
          album.narrators.map((narr) => narr.character)
        );
        for (const character of uniqueCharacters) {
          if (character) {
            characterCounts[character] = (characterCounts[character] || 0) + 1;
          }
        }
      }
    }

    return characterCounts;
  }
);

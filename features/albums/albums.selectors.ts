import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import FuzzySearch from "fuzzy-search";

const selectAlbums = (state: RootState) => state.albums.data;
const selectSeenAlbums = (state: RootState) =>
  state.sessionData.data.seenAlbums;
const selectHistorySettings = (state: RootState) => state.historySettings;

export const selectFilteredAlbums = createSelector(
  [selectAlbums, selectSeenAlbums, selectHistorySettings],
  (albums, seenAlbums, historySettings) => {
    const {
      sortMode,
      showAllAlbums,
      sortDirection,
      filteredCharacters,
      albumNameFilter,
      filteredCharactersMode,
      startDate,
      endDate,
    } = historySettings;

    // 1. Filter by seen status
    const filtered = showAllAlbums
      ? [...albums]
      : albums.filter((album) => seenAlbums[album.id]);

    // 2. Filter by characters
    const characterFiltered =
      !filteredCharacters || filteredCharacters.length === 0
        ? filtered
        : filtered.filter((album) =>
            filteredCharactersMode === "AND"
              ? filteredCharacters.every((character) =>
                  album.narrators?.some((narr) => narr.character === character)
                )
              : filteredCharacters.some((character) =>
                  album.narrators?.some((narr) => narr.character === character)
                )
          );

    // 3. Filter by Start and End Date
    const parsedStartDate = startDate ? new Date(startDate) : null;
    const parsedEndDate = endDate ? new Date(endDate) : null;

    const dateFiltered = characterFiltered.filter((album) => {
      const releaseDate = album.release_date
        ? new Date(album.release_date)
        : null;
      if (!releaseDate) return true; // Include albums without a release date if date filters are active.

      let isAfterStartDate = true;
      if (parsedStartDate) {
        isAfterStartDate = releaseDate <= parsedStartDate;
      }

      let isBeforeEndDate = true;
      if (parsedEndDate) {
        isBeforeEndDate = releaseDate >= parsedEndDate;
      }

      return isAfterStartDate && isBeforeEndDate;
    });

    // 4. Filter by Album Name
    const searcher = new FuzzySearch(dateFiltered, ["name", "number"], {
      sort: true,
    });

    const albumNameFiltered = searcher.search(albumNameFilter);

    let sorted;
    if (sortMode === "searchAccuracy") {
      sorted = albumNameFiltered;
    } else {
      // 5. Sort
      sorted = albumNameFiltered.sort((a, b) => {
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
    }

    return sorted;
  }
);

export const findAlbumById = (state: RootState, albumId: string | null) => {
  if (!albumId) return null;
  return state.albums.data.find((album) => album.id === albumId);
};

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

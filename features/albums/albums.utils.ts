import offlineData from "@/assets/data/albums.json";
import { AlbumDto, Narrator } from "@/types/albums";
import { isNetworkConnected } from "@/util/network-util";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

export const fetchAlbums = async () => {
  let albums: AlbumDto[];
  if (await isNetworkConnected()) {
    const res = await fetch(API_BASE_URL + "/v1/albums");
    if (!res.ok) throw new Error("Failed to fetch albums");
    albums = (await res.json()) as AlbumDto[];
  } else {
    albums = offlineData as AlbumDto[];
  }

  const albumsWithNarrators = albums.map((album) => ({
    ...album,
    narrators: parseAlbumNarrators(album.narrator),
  }));
  const totalNarrators = albumsWithNarrators.flatMap(
    (album) => album.narrators
  );
  return { albums: albumsWithNarrators, narrators: totalNarrators };
};

const parseAlbumNarrators = (stringList?: string) => {
  const narrators: Narrator[] = [];
  if (!stringList) {
    return [];
  }
  const splitted = stringList.split("\n");
  splitted.forEach((parsed) => {
    const splitParts = parsed.split("-");
    if (splitParts.length !== 2) {
      return;
    }
    const [character, artist] = splitParts;

    let characterReworked = !character.includes(",")
      ? character
      : character.split(",")[0];

    narrators.push({
      character: characterReworked.trim(),
      artist: artist.trim(),
    });
  });
  return narrators;
};

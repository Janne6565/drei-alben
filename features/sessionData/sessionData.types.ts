import { AlbumDto } from "@/types/albums";

export type SessionDataState = {
  data: {
    currentAlbumId: AlbumDto["id"];
    seenAlbums: { [key: AlbumDto["id"]]: number };
    albumRatings: { [key: AlbumDto["id"]]: number };
  };
};

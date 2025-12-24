import { AlbumDto } from "@/types/albums";

export type AlbumsState = {
  data: AlbumDto[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  lastFetchedAt?: string;
};

import { AlbumDto } from "@/types/albums";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

export const fetchAlbums = async () => {
  const res = await fetch(API_BASE_URL + "/v1/albums");
  if (!res.ok) throw new Error("Failed to fetch albums");
  return (await res.json()) as AlbumDto[];
};

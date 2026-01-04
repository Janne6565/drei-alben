export enum AlbumType {
  regular = "regular",
  special = "special",
}

export type ImageDto = {
  url: string;
  width: number;
  height: number;
};

export type Narrator = {
  artist: string;
  character: string;
  count?: number;
};

export type AlbumDto = {
  id: string;
  images: ImageDto[];
  name: string;
  number?: string | null;

  type: AlbumType | "regular" | "special";
  rating: number;
  number_of_ratings: number;
  popularity: number;

  release_date: string;
  updated_at: string;

  spotify_id: string;
  apple_music_id: string;
  deezer_id: string;

  description: string;
  is_hidden: boolean;
  narrator?: string;
  weblink?: string;
  narrators?: Narrator[];
};

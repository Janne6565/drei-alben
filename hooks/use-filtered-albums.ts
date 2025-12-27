import { useAppSelector } from "@/store/hooks";
import { selectFilteredAlbums } from "@/features/albums/albums.selectors";

export const useFilteredAlbums = () => {
  return useAppSelector(selectFilteredAlbums);
};


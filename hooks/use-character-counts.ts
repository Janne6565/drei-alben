import { useAppSelector } from "@/store/hooks";
import { selectCharacterCounts } from "@/features/albums/albums.selectors";

export const useCharacterCounts = () => {
  return useAppSelector(selectCharacterCounts);
};

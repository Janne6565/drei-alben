import useSessionData from "@/features/sessionData/sessionData.hooks";
import { setCurrentAlbumToSeen } from "@/features/sessionData/sessionData.slice";
import { useAppDispatch } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import AlbumButton from "./AlbumButton";

const AlreadySeenButton = () => {
  const dispatch = useAppDispatch();
  const { pickNewAlbum } = useSessionData();
  const clickHandler = () => {
    dispatch(setCurrentAlbumToSeen());
    pickNewAlbum();
  };

  return (
    <AlbumButton onPress={clickHandler} label={"Bereits gehört"}>
      <Ionicons name="checkmark-done" size={24} color="white" />
    </AlbumButton>
  );
};

export default AlreadySeenButton;

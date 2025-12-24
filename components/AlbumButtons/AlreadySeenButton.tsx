import useSessionData from "@/features/sessionData/sessionData.hooks";
import { setCurrentAlbumToSeen } from "@/features/sessionData/sessionData.slice";
import { useAppDispatch } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "../IconButton";

const AlreadySeenButton = () => {
  const dispatch = useAppDispatch();
  const { pickNewAlbum } = useSessionData();
  const clickHandler = () => {
    dispatch(setCurrentAlbumToSeen());
    pickNewAlbum();
  };

  return (
    <IconButton onPress={clickHandler}>
      <Ionicons name="checkmark-done" size={24} color="white" />
    </IconButton>
  );
};

export default AlreadySeenButton;

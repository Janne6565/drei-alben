import useSessionData from "@/features/sessionData/sessionData.hooks";
import Feather from "@expo/vector-icons/Feather";
import IconButton from "../IconButton";

const RefreshAlbumButton = () => {
  const { pickNewAlbum } = useSessionData();

  return (
    <IconButton onPress={pickNewAlbum}>
      <Feather name="refresh-ccw" size={24} color="white" />
    </IconButton>
  );
};

export default RefreshAlbumButton;

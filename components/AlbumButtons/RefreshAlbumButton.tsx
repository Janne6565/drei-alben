import useSessionData from "@/features/sessionData/sessionData.hooks";
import Feather from "@expo/vector-icons/Feather";
import AlbumButton from "./AlbumButton";

const RefreshAlbumButton = () => {
  const { pickNewAlbum } = useSessionData();

  return (
    <AlbumButton onPress={pickNewAlbum} label={"Andere Folge"}>
      <Feather name="refresh-ccw" size={24} color="white" />
    </AlbumButton>
  );
};

export default RefreshAlbumButton;

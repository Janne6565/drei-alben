import useSessionData from "@/features/sessionData/sessionData.hooks";
import { Pressable, Text } from "react-native";

const RefreshAlbumButton = () => {
  const { pickNewAlbum } = useSessionData();

  return (
    <Pressable onPress={pickNewAlbum}>
      <Text style={{ color: "white" }}>Refresh</Text>
    </Pressable>
  );
};

export default RefreshAlbumButton;

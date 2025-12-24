import useSessionData from "@/features/sessionData/sessionData.hooks";
import { setCurrentAlbumToSeen } from "@/features/sessionData/sessionData.slice";
import { useAppDispatch } from "@/store/hooks";
import { Pressable, Text } from "react-native";

const AlreadySeenButton = () => {
  const dispatch = useAppDispatch();
  const { pickNewAlbum } = useSessionData();
  const clickHandler = () => {
    dispatch(setCurrentAlbumToSeen());
    pickNewAlbum();
  };

  return (
    <Pressable onPress={clickHandler}>
      <Text style={{ color: "white" }}>Already Seen</Text>
    </Pressable>
  );
};

export default AlreadySeenButton;

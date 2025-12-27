import useSessionData from "@/features/sessionData/sessionData.hooks";
import { setCurrentAlbumToSeen } from "@/features/sessionData/sessionData.slice";
import { useAppDispatch } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import AlbumButton, { AlbumButtonSize } from "./AlbumButton";

const AlreadySeenButton = (props: {
  onPress?: () => void;
  size?: AlbumButtonSize;
  label?: string;
}) => {
  const dispatch = useAppDispatch();
  const { pickNewAlbum } = useSessionData();
  const clickHandler = () => {
    if (props.onPress) {
      props.onPress();
    } else {
      dispatch(setCurrentAlbumToSeen());
      pickNewAlbum();
    }
  };

  return (
    <AlbumButton
      onPress={clickHandler}
      label={props.label ? props.label : "Bereits gehört"}
      size={props.size}
    >
      <Ionicons
        name="checkmark-done"
        size={props.size === "M" ? 17 : 24}
        color="white"
      />
    </AlbumButton>
  );
};

export default AlreadySeenButton;

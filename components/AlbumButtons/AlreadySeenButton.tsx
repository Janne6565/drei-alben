import { openRatingModal } from "@/features/modals/modals.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import AlbumButton, { AlbumButtonSize } from "./AlbumButton";

const AlreadySeenButton = (props: {
  onPress?: () => void;
  size?: AlbumButtonSize;
  label?: string;
}) => {
  const dispatch = useAppDispatch();
  const currentAlbumId = useAppSelector(
    (state) => state.sessionData.data.currentAlbumId
  );

  const clickHandler = () => {
    if (props.onPress) {
      props.onPress();
    } else {
      dispatch(
        openRatingModal({ albumId: currentAlbumId, shouldPickNewAlbum: true })
      );
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

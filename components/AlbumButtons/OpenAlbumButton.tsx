import Entypo from "@expo/vector-icons/Entypo";
import AlbumButton, { AlbumButtonSize } from "./AlbumButton";

const OpenAlbumButton = (props: {
  onPress?: () => void;
  size?: AlbumButtonSize;
}) => {
  const clickHandler = () => {
    if (!props.onPress) {
      return;
    }
    props.onPress();
  };

  return (
    <AlbumButton onPress={clickHandler} label={"Play"} size={props.size}>
      <Entypo
        name="controller-play"
        size={props.size === "M" ? 17 : 55}
        color="white"
      />
    </AlbumButton>
  );
};

export default OpenAlbumButton;

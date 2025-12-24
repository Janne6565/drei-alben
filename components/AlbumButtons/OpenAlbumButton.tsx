import Entypo from "@expo/vector-icons/Entypo";
import IconButton from "../IconButton";

const OpenAlbumButton = (props: { onPress?: () => void }) => {
  const clickHandler = () => {
    if (!props.onPress) {
      return;
    }
    props.onPress();
  };

  return (
    <IconButton onPress={clickHandler}>
      <Entypo name="controller-play" size={55} color="white" />
    </IconButton>
  );
};

export default OpenAlbumButton;

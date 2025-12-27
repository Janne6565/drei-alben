import Entypo from "@expo/vector-icons/Entypo";
import AlbumButton from "./AlbumButton";

const OpenAlbumButton = (props: { onPress?: () => void }) => {
  const clickHandler = () => {
    if (!props.onPress) {
      return;
    }
    props.onPress();
  };

  return (
    <AlbumButton onPress={clickHandler} label={"Öffnen"}>
      <Entypo name="controller-play" size={55} color="white" />
    </AlbumButton>
  );
};

export default OpenAlbumButton;

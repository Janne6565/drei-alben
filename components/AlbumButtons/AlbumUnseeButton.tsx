import FontAwesome from "@expo/vector-icons/FontAwesome";
import AlbumButton, { AlbumButtonSize } from "./AlbumButton";

const AlbumUnseeButton = (props: {
  onPress: () => void;
  size?: AlbumButtonSize;
  label?: string;
}) => {
  const clickHandler = () => {
    props.onPress();
  };

  return (
    <AlbumButton
      onPress={clickHandler}
      label={props.label ? props.label : "Entfernen"}
      size={props.size}
    >
      <FontAwesome
        name="remove"
        color="white"
        size={props.size === "M" ? 17 : 24}
        style={{ alignSelf: "center" }}
      />
    </AlbumButton>
  );
};

export default AlbumUnseeButton;

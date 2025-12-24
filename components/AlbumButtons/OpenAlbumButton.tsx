import { AlbumDto } from "@/types/albums";
import { openAppleMusicSearch } from "@/util/music-provider-utils";
import { Pressable, Text } from "react-native";

const OpenAlbumButton = (props: { album?: AlbumDto }) => {
  const clickHandler = () => {
    if (!props.album) {
      return;
    }
    openAppleMusicSearch(props.album.name + " Die Drei Fragezeichen");
  };

  return (
    <Pressable onPress={clickHandler}>
      <Text style={{ color: "white" }}>Open</Text>
    </Pressable>
  );
};

export default OpenAlbumButton;

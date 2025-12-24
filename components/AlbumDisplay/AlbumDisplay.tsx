import { AlbumDto } from "@/types/albums";
import { Image } from "expo-image";
import { ThemedView } from "../themed-view";

const AlbumDisplay = ({ album }: { album: AlbumDto }) => {
  return (
    <ThemedView>
      <Image
        source={album.images[0].url}
        style={{
          width: 360,
          height: 360,
          alignSelf: "center",
        }}
      />
    </ThemedView>
  );
};
export default AlbumDisplay;

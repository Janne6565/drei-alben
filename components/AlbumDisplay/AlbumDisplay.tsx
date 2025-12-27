import { AlbumDto } from "@/types/albums";
import { toUppercase } from "@/util/string-utils";
import { Image } from "expo-image";
import { Dimensions, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

const DESCRIPTION_FONT_SIZE = 16;
const DESCRIPTION_LINE_HEIGHT = 22;

const AlbumDisplay = ({
  album,
  onPress,
}: {
  album: AlbumDto;
  onPress: () => void;
}) => {
  const lines = Dimensions.get("window").height < 700 ? 2 : 4;
  const reservedHeight = lines * DESCRIPTION_LINE_HEIGHT;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ gap: 25, padding: 0 }}
    >
      <Image
        source={album.images[0].url}
        style={{
          width: "auto",
          height: 300,
          borderRadius: 5,
          alignSelf: "center",
          borderColor: "rgba(82, 180, 230, 1)",
          borderWidth: 2,
          aspectRatio: 1,
          paddingBottom: 1,
        }}
      />
      <ThemedView style={{ gap: 15 }}>
        <ThemedView style={{ gap: 5 }}>
          <ThemedText
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              textAlign: "center",
              alignSelf: "center",
              fontSize: 15,
            }}
          >
            {!album.name.toLowerCase().startsWith("die drei ???") &&
              "Die drei Fragezeichen: "}
          </ThemedText>
          <ThemedText
            style={{
              alignSelf: "center",
              fontSize: 25,
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            {toUppercase(album.name)}
          </ThemedText>
          <ThemedText
            style={{
              width: "80%",
              alignSelf: "center",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: DESCRIPTION_FONT_SIZE,
              lineHeight: DESCRIPTION_LINE_HEIGHT,
              minHeight: reservedHeight,
            }}
            numberOfLines={lines}
          >
            {album.description || " "}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};
export default AlbumDisplay;

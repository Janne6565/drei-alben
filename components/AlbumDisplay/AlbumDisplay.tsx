import usePrimaryColor from "@/hooks/use-primary-color";
import { AlbumDto } from "@/types/albums";
import { toUppercase } from "@/util/string-utils";
import { Dimensions, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import LoadableImage from "../ui/loadable-image";

const DESCRIPTION_FONT_SIZE = 16;
const DESCRIPTION_LINE_HEIGHT = 22;

const AlbumDisplay = ({
  album,
  onPress,
}: {
  album: AlbumDto;
  onPress: () => void;
}) => {
  const height = Dimensions.get("window").height;
  const lines = height < 700 ? 2 : height < 800 ? 5 : 6;
  const reservedHeight = lines * DESCRIPTION_LINE_HEIGHT;
  const primaryColor = usePrimaryColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ gap: 25, padding: 0 }}
    >
      <LoadableImage
        source={{ uri: album.images[0].url }}
        placeholder="|rF?hV%2WCj[ayj[a|j["
        transition={300}
        style={{
          width: "auto",
          height: 300,
          borderRadius: 5,
          alignSelf: "center",
          borderColor: primaryColor,
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

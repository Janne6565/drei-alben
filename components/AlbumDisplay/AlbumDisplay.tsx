import { AlbumDto } from "@/types/albums";
import { toUppercase } from "@/util/string-utils";
import { Image } from "expo-image";
import { Dimensions, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

const AlbumDisplay = ({
  album,
  onPress,
}: {
  album: AlbumDto;
  onPress: () => void;
}) => {
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
          >
            {toUppercase(album.name)}
          </ThemedText>
          <ThemedText
            style={{
              width: "80%",
              alignSelf: "center",
              textAlign: "center",
              overflowY: "hidden",
              textOverflow: "ellpise",
              color: "rgba(255, 255, 255, 0.7)",
            }}
            numberOfLines={Dimensions.get("window").height < 700 ? 3 : 4}
          >
            {album.description}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};
export default AlbumDisplay;

import { AlbumDto } from "@/types/albums";
import { toUppercase } from "@/util/string-utils";
import { Image } from "expo-image";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

const AlbumDisplay = ({
  album,
  onDescriptionClick,
}: {
  album: AlbumDto;
  onDescriptionClick: () => void;
}) => {
  return (
    <>
      <ThemedView style={{ gap: 35 }}>
        <Image
          source={album.images[0].url}
          style={{
            width: 360,
            height: 360,
            borderRadius: 5,
            alignSelf: "center",
            borderColor: "rgba(82, 180, 230, 1)",
            borderWidth: 2,
            aspectRatio: 1,
            paddingBottom: 1,
          }}
        />
        <ThemedView style={{ gap: 15, height: 150 }}>
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
              numberOfLines={4}
              onPress={() => {
                onDescriptionClick();
              }}
            >
              {album.description}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </>
  );
};
export default AlbumDisplay;

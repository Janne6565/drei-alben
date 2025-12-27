import { AlbumDto } from "@/types/albums";
import { formatDate } from "@/util/format-date";
import { openLink } from "@/util/music-provider-utils";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
import { MUSIC_PLATFORMS } from "./MusicOpenModal/MusicOpenModal";

const AlbumDetailsModalContents = ({ album }: { album: AlbumDto }) => {
  return (
    <View style={{ width: "80%", alignSelf: "center", paddingTop: 10 }}>
      <ThemedText style={{ fontSize: 15, opacity: 0.5 }}>
        Die drei Fragezeichen:
      </ThemedText>
      <ThemedText style={{ fontSize: 25, paddingTop: 3, paddingBottom: 3 }}>
        {album.name}
      </ThemedText>
      {album.number && (
        <>
          <ThemedText style={styles.headings}>Nummer:</ThemedText>
          <ThemedText style={styles.values}>{album.number}</ThemedText>
        </>
      )}

      <ThemedText style={styles.headings}>Erschienen am:</ThemedText>
      <ThemedText style={styles.values}>
        {formatDate(Date.parse(album.release_date))}
      </ThemedText>
      <ThemedText style={styles.headings}>Beschreibung:</ThemedText>
      <ThemedText style={styles.values}>{album.description}</ThemedText>
      <ThemedText style={styles.headings}>Links:</ThemedText>
      {MUSIC_PLATFORMS.map((platform) => (
        <TouchableOpacity
          key={platform.label}
          onPress={() =>
            openLink(platform.calculateLink(album)(platform.albumKey))
          }
        >
          <View style={{ flexDirection: "row", opacity: 0.7 }}>
            <ThemedText
              style={{
                fontSize: 15,
                textDecorationLine: "underline",
              }}
            >
              {platform.label}
            </ThemedText>
            {!album[platform.albumKey] && (
              <ThemedText style={{ opacity: 0.6, fontSize: 15 }}>
                {" "}
                (Nicht vollständig unterstützt)
              </ThemedText>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headings: {
    paddingTop: 5,
    fontSize: 15,
    opacity: 0.5,
  },
  values: {
    fontSize: 15,
    opacity: 0.7,
  },
});

export default AlbumDetailsModalContents;

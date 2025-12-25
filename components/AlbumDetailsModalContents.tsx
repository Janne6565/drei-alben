import { AlbumDto } from "@/types/albums";
import { formatDate } from "@/util/format-date";
import { View } from "react-native";
import { ThemedText } from "./themed-text";

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
          <ThemedText style={{ fontSize: 15, opacity: 0.5 }}>
            Nummer:
          </ThemedText>
          <ThemedText style={{ fontSize: 15, opacity: 0.7 }}>
            {album.number}
          </ThemedText>
        </>
      )}

      <ThemedText style={{ fontSize: 15, opacity: 0.5 }}>
        Erschienen am:
      </ThemedText>
      <ThemedText style={{ fontSize: 15, opacity: 0.7 }}>
        {formatDate(Date.parse(album.release_date))}
      </ThemedText>
      <ThemedText style={{ fontSize: 15, opacity: 0.5 }}>
        Beschreibung:
      </ThemedText>
      <ThemedText style={{ fontSize: 15, opacity: 0.7 }}>
        {album.description}
      </ThemedText>
    </View>
  );
};

export default AlbumDetailsModalContents;

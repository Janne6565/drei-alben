import { ThemedText } from "@/components/themed-text";
import { setAlbumToSeen } from "@/features/sessionData/sessionData.slice";
import { useAppDispatch } from "@/store/hooks";
import { AlbumDto } from "@/types/albums";
import { assertUserConfirmation } from "@/util/assert-user-confirmation";
import { formatDate } from "@/util/format-date";
import { Pressable, StyleSheet, View } from "react-native";
import AlbumUnseeButton from "../AlbumButtons/AlbumUnseeButton";
import AlreadySeenButton from "../AlbumButtons/AlreadySeenButton";
import OpenAlbumButton from "../AlbumButtons/OpenAlbumButton";
import LoadableImage from "../ui/loadable-image";

interface HistoryScreenAlbumColumnProps {
  item: AlbumDto;
  seenAlbums: Record<string, number>;
  openDetailsModal: (album: AlbumDto) => void;
  openModal: (album: AlbumDto) => void;
  openAlbumModal: (album: AlbumDto) => void;
}

export const HistoryScreenAlbumColumn = ({
  item,
  seenAlbums,
  openDetailsModal,
  openModal,
  openAlbumModal,
}: HistoryScreenAlbumColumnProps) => {
  const dispatch = useAppDispatch();
  const hasBeenSeen = seenAlbums[item.id];

  return (
    <Pressable onPress={() => openDetailsModal(item)} key={item.id}>
      <View style={[styles.itemContainer]}>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              maxWidth: "70%",
              flex: 1,
            },
            !hasBeenSeen && { opacity: 0.5 },
          ]}
        >
          <LoadableImage
            source={{ uri: item.images[0].url }}
            style={styles.albumArt}
          />
          <View style={styles.albumInfo}>
            <ThemedText style={styles.artistName}>
              Die drei Fragezeichen:
            </ThemedText>
            <ThemedText style={styles.albumTitle} numberOfLines={1}>
              {item.name}
            </ThemedText>
            <ThemedText style={styles.albumReleaseDate} numberOfLines={1}>
              Erschienen am: {formatDate(Date.parse(item.release_date))}
            </ThemedText>
            {hasBeenSeen && (
              <ThemedText style={styles.albumReleaseDate} numberOfLines={1}>
                Gehört am: {formatDate(seenAlbums[item.id])}
              </ThemedText>
            )}
          </View>
        </View>
        <View
          style={{
            paddingLeft: 4,
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: 10,
            opacity: hasBeenSeen ? 1 : 0.7,
          }}
        >
          {hasBeenSeen ? (
            <AlbumUnseeButton
              onPress={() => {
                openModal(item);
              }}
              size={"M"}
            />
          ) : (
            <AlreadySeenButton
              onPress={() => {
                assertUserConfirmation({
                  title: "Album als gehört markieren",
                  message: "Wollen Sie " + item.name + " als gehört markieren?",
                  isNonDestructive: true,
                  onConfirm: () => dispatch(setAlbumToSeen(item.id)),
                  confirmationText: "Als gehört markieren",
                });
              }}
              size={"M"}
              label={"Gehört"}
            />
          )}
          <OpenAlbumButton
            onPress={() => {
              openAlbumModal(item);
            }}
            size={"M"}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  albumArt: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
  albumInfo: {
    flex: 1,
    marginLeft: 12,
  },
  artistName: {
    color: "gray",
    fontSize: 14,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  albumReleaseDate: {
    fontSize: 14,
    color: "gray",
  },
  removeButtonText: {
    color: "red",
    marginLeft: 12,
    textAlign: "right",
  },
});

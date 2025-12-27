import { ThemedText } from "@/components/themed-text";
import { setAlbumToSeen } from "@/features/sessionData/sessionData.slice";
import { useAppDispatch } from "@/store/hooks";
import { AlbumDto } from "@/types/albums";
import { assertUserConfirmation } from "@/util/assert-user-confirmation";
import { formatDate } from "@/util/format-date";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { RefObject } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

interface HistoryScreenAlbumColumnProps {
  item: AlbumDto;
  seenAlbums: Record<string, number>;
  openDetailsModal: (album: AlbumDto) => void;
  openModal: (album: AlbumDto) => void;
  openAlbumModalRef: RefObject<BottomSheetModal | null>;
  setSelectedAlbum: (album: AlbumDto) => void;
  textColorPrimary: string;
  textColorSecondary: string;
}

export const HistoryScreenAlbumColumn = ({
  item,
  seenAlbums,
  openDetailsModal,
  openModal,
  openAlbumModalRef,
  setSelectedAlbum,
  textColorPrimary,
  textColorSecondary,
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
          <Image source={{ uri: item.images[0].url }} style={styles.albumArt} />
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
        {hasBeenSeen ? (
          <TouchableOpacity
            onPress={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openModal(item);
            }}
          >
            <ThemedText style={styles.removeButtonText}>Entfernen</ThemedText>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              paddingLeft: 4,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={(e) => {
                openAlbumModalRef.current?.present();
                setSelectedAlbum(item);
              }}
            >
              <ThemedText style={{ color: textColorSecondary }}>
                Anhören
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                assertUserConfirmation({
                  title: "Album als gehört markieren",
                  message: "Wollen Sie " + item.name + " als gehört markieren?",
                  isNonDestructive: true,
                  onConfirm: () => dispatch(setAlbumToSeen(item.id)),
                  confirmationText: "Als gehört markieren",
                });
              }}
            >
              <ThemedText
                style={{
                  color: textColorPrimary,
                  alignSelf: "flex-end",
                }}
              >
                Bereits Angehört
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
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

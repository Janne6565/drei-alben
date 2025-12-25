import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  clearSeenAlbums,
  dismissAlbum,
} from "@/features/sessionData/sessionData.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AlbumDto } from "@/types/albums";
import { assertUserConfirmation } from "@/util/assert-user-confirmation";
import { formatDate } from "@/util/format-date";
import Feather from "@expo/vector-icons/Feather";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useMemo, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
import AlbumDetailsModalContents from "./AlbumDetailsModalContents";
import Picker from "./Picker";
import { PrimaryButton } from "./PrimaryButton";
import BottomModal from "./ui/bottom-modal";

type HistorySortMode = "listenedDate" | "releaseDate";

export const HistoryScreen = () => {
  const dispatch = useAppDispatch();
  const { seenAlbums } = useAppSelector((state) => state.sessionData.data);
  const { data: albums } = useAppSelector((state) => state.albums);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumDto | null>(null);
  const [sortMode, setSortMode] = useState<HistorySortMode>("listenedDate");
  const [showAllAlbums, setShowAllAlbums] = useState(false);

  const albumDetailsModalRef = useRef<BottomSheetModal>(null);
  const sortPickerModalsRef = useRef<BottomSheetModal>(null);

  const seenAlbumsData = useMemo(() => {
    const filtered = showAllAlbums
      ? albums
      : albums.filter((album) => seenAlbums[album.id]);

    return filtered.sort((a, b) => {
      if (sortMode === "releaseDate") {
        return Date.parse(b.release_date) - Date.parse(a.release_date);
      }

      // default: listened date
      const aDate = seenAlbums[a.id] || 0;
      const bDate = seenAlbums[b.id] || 0;

      return bDate - aDate;
    });
  }, [albums, seenAlbums, sortMode, showAllAlbums]);

  const openModal = (album: AlbumDto) => {
    assertUserConfirmation({
      title: "Bestätigen",
      message: `Möchtest du "${album.name}" wirklich aus deiner Historie entfernen?`,
      onConfirm: () => dispatch(dismissAlbum(album.id)),
      confirmationText: "Entfernen",
    });
  };

  const openClearAllModal = () => {
    assertUserConfirmation({
      title: "Bestätigen",
      message:
        "Bist du dir sicher, dass du deine gesamte Historie zurücksetzen willst?",
      onConfirm: () => dispatch(clearSeenAlbums()),
      confirmationText: "Zurücksetzen",
    });
  };

  const openDetailsModal = (album: AlbumDto) => {
    setSelectedAlbum(album);
    albumDetailsModalRef.current?.present();
  };

  const renderItem = ({ item }: { item: AlbumDto }) => {
    const hasBeenSeen = seenAlbums[item.id];

    return (
      <Pressable onPress={() => openDetailsModal(item)} key={item.id}>
        <View style={[styles.itemContainer, !hasBeenSeen && { opacity: 0.5 }]}>
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
          {hasBeenSeen && (
            <TouchableOpacity
              onPress={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openModal(item);
              }}
            >
              <ThemedText style={styles.removeButtonText}>Entfernen</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Historie</ThemedText>
      {albums.length > 0 ? (
        <>
          <View style={{ paddingBottom: 5, gap: 3 }}>
            <ThemedText style={{ alignSelf: "center" }}>
              Gehörte Alben:{" "}
              {seenAlbumsData.filter((album) => !!seenAlbums[album.id]).length}{" "}
              / {albums.length}
            </ThemedText>
            <Progress.Bar
              width={300}
              color={"rgba(82, 180, 230, 1)"}
              style={{ alignSelf: "center" }}
              progress={
                seenAlbumsData.filter((album) => !!seenAlbums[album.id])
                  .length / albums.length
              }
            />
          </View>

          <ScrollView>
            <Pressable
              style={{ padding: 8, opacity: 0.7 }}
              onPress={() => sortPickerModalsRef.current?.present()}
            >
              <ThemedText style={{ alignSelf: "center" }}>
                Sortiert nach:{" "}
                {sortMode === "releaseDate" ? "Erschienen am" : "Gehört am"}{" "}
                <Feather name="external-link" size={16} color="white" />
              </ThemedText>
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                gap: 10,
              }}
            >
              <ThemedText>Alle anzeigen</ThemedText>
              <Switch
                value={showAllAlbums}
                onValueChange={() => setShowAllAlbums(!showAllAlbums)}
              />
            </View>
            <View style={styles.clearButtonContainer}>
              <PrimaryButton
                label="Gehörte Alben zurücksetzen"
                onPress={openClearAllModal}
              />
            </View>
            {seenAlbumsData.map((album) => renderItem({ item: album }))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.centeredView}>
          <ThemedText>Keine gehörten Alben</ThemedText>
        </View>
      )}

      <BottomModal ref={albumDetailsModalRef} height={"60%"}>
        <BottomSheetView style={{ overflow: "visible" }}>
          {selectedAlbum && <AlbumDetailsModalContents album={selectedAlbum} />}
        </BottomSheetView>
      </BottomModal>
      <BottomModal ref={sortPickerModalsRef} height={"30%"}>
        <BottomSheetView>
          <View style={styles.sortContainer}>
            <Picker
              value={sortMode}
              setValue={setSortMode}
              options={[
                { label: "Gehört am", value: "listenedDate" },
                { label: "Veröffentlicht am", value: "releaseDate" },
              ]}
            />
          </View>
        </BottomSheetView>
      </BottomModal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
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
  },
  sortContainer: {
    marginHorizontal: 16,
  },
  modalContent: {
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#121212",
  },
  modalText: {
    marginBottom: 12,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  clearButtonContainer: {
    padding: 16,
  },
});

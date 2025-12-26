import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  clearSeenAlbums,
  dismissAlbum,
  setAlbumToSeen,
} from "@/features/sessionData/sessionData.slice";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AlbumDto } from "@/types/albums";
import { assertUserConfirmation } from "@/util/assert-user-confirmation";
import { formatDate } from "@/util/format-date";
import Feather from "@expo/vector-icons/Feather";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
import { HistoryModals } from "./HistoryModals";
import IconButton from "./IconButton";

export const HistoryScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { seenAlbums } = useAppSelector((state) => state.sessionData.data);
  const { data: albums } = useAppSelector((state) => state.albums);
  const { sortMode, showAllAlbums } = useAppSelector(
    (state) => state.historySettings
  );
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumDto | null>(null);

  const albumDetailsModalRef = useRef<BottomSheetModal>(null);
  const optionsModalRef = useRef<BottomSheetModal>(null);
  const openAlbumModalRef = useRef<BottomSheetModal>(null);
  const textColor = useThemeColor({}, "text");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => optionsModalRef.current?.present()}
          style={{
            marginRight: 15,
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0,
            padding: 0,
            borderRadius: 0,
            aspectRatio: "auto",
          }}
        >
          <Feather name="settings" size={24} color={textColor} />
        </IconButton>
      ),
    });
  }, [navigation, textColor]);

  const seenAlbumsData = useMemo(() => {
    const filtered = showAllAlbums
      ? [...albums]
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

  const textColorPrimary = useThemeColor(
    { dark: "rgba(120, 120, 200, 1)" },
    "text"
  );
  const textColorSecondary = useThemeColor({ dark: "lightblue" }, "text");

  const renderItem = ({ item }: { item: AlbumDto }) => {
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
            <Image
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
                    message:
                      "Wollen Sie " + item.name + " als gehört markieren?",
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

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        onPress={() => optionsModalRef.current?.present()}
        style={styles.settingsButton}
        hitSlop={10}
      >
        <Feather name="settings" size={24} color="white" />
      </TouchableOpacity>

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

          <FlatList
            data={seenAlbumsData}
            renderItem={renderItem}
            keyExtractor={(alb) => alb.id}
          />
        </>
      ) : (
        <View style={styles.centeredView}>
          <ThemedText>Keine gehörten Alben</ThemedText>
        </View>
      )}

      <HistoryModals
        openAlbumModalRef={openAlbumModalRef}
        albumDetailsModalRef={albumDetailsModalRef}
        optionsModalRef={optionsModalRef}
        selectedAlbum={selectedAlbum}
        sortMode={sortMode}
        showAllAlbums={showAllAlbums}
        openClearAllModal={openClearAllModal}
      />
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
    width: "100%",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingsButton: {
    position: "absolute",
    top: 55,
    right: 16,
    zIndex: 10,
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

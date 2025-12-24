import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  clearSeenAlbums,
  dismissAlbum,
} from "@/features/sessionData/sessionData.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AlbumDto } from "@/types/albums";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { PrimaryButton } from "./PrimaryButton";

export const HistoryScreen = () => {
  const dispatch = useAppDispatch();
  const { seenAlbums } = useAppSelector((state) => state.sessionData.data);
  const { data: albums } = useAppSelector((state) => state.albums);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumDto | null>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const clearAllModalRef = useRef<BottomSheetModal>(null);

  const seenAlbumsData = albums.filter((album) => seenAlbums[album.id]);

  const openModal = (album: AlbumDto) => {
    setSelectedAlbum(album);
    bottomSheetRef.current?.present();
  };

  const closeModal = () => {
    bottomSheetRef.current?.close();
    setSelectedAlbum(null);
  };

  const confirmDismissal = () => {
    if (selectedAlbum) {
      dispatch(dismissAlbum(selectedAlbum.id));
    }
    closeModal();
  };

  const openClearAllModal = () => {
    clearAllModalRef.current?.present();
  };

  const closeClearAllModal = () => {
    clearAllModalRef.current?.close();
  };

  const confirmClearAll = () => {
    dispatch(clearSeenAlbums());
    closeClearAllModal();
  };

  const renderItem = ({ item }: { item: AlbumDto }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.images[0].url }} style={styles.albumArt} />
      <View style={styles.albumInfo}>
        <ThemedText style={styles.artistName}>
          Die drei Fragezeichen:
        </ThemedText>
        <ThemedText style={styles.albumTitle} numberOfLines={1}>
          {item.name}
        </ThemedText>
      </View>
      <TouchableOpacity onPress={() => openModal(item)}>
        <ThemedText style={styles.removeButtonText}>Entfernen</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>History</ThemedText>
      {seenAlbumsData.length > 0 ? (
        <>
          <FlatList
            data={seenAlbumsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.clearButtonContainer}>
            <PrimaryButton label="Clear History" onPress={openClearAllModal} />
          </View>
        </>
      ) : (
        <View style={styles.centeredView}>
          <ThemedText>No seen albums yet.</ThemedText>
        </View>
      )}
      <BottomSheetModal
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: "#121212" }}
        handleIndicatorStyle={{ backgroundColor: "#444", width: 40 }}
      >
        <BottomSheetView style={styles.modalContent}>
          {selectedAlbum && (
            <>
              <ThemedText style={styles.modalText}>
                Möchtest du &quot;{selectedAlbum.name}&quot; wirklich aus deiner
                Historie entfernen?
              </ThemedText>
              <View style={styles.modalButtonContainer}>
                <Button title="Abbrechen" onPress={closeModal} />
                <Button
                  title="Bestätigen"
                  onPress={confirmDismissal}
                  color="red"
                />
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={clearAllModalRef}
        backgroundStyle={{ backgroundColor: "#121212" }}
        handleIndicatorStyle={{ backgroundColor: "#444", width: 40 }}
        onDismiss={closeClearAllModal}
      >
        <BottomSheetView style={styles.modalContent}>
          <ThemedText style={styles.modalText}>
            Are you sure you want to clear your entire history?
          </ThemedText>
          <View style={styles.modalButtonContainer}>
            <Button title="Cancel" onPress={closeClearAllModal} />
            <Button title="Confirm" onPress={confirmClearAll} color="red" />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
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
    width: 50,
    height: 50,
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
  removeButtonText: {
    color: "red",
    marginLeft: 12,
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

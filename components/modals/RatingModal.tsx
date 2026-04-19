import { ThemedText } from "@/components/themed-text";
import { StarRating } from "@/components/ui/star-rating";
import { findAlbumById } from "@/features/albums/albums.selectors";
import { closeRatingModal } from "@/features/modals/modals.slice";
import useSessionData from "@/features/sessionData/sessionData.hooks";
import {
  setAlbumRating,
  setAlbumToSeen,
} from "@/features/sessionData/sessionData.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import BottomModal from "../ui/bottom-modal";

export function RatingModal() {
  const dispatch = useAppDispatch();
  const { isOpen, albumId, shouldPickNewAlbum } = useAppSelector(
    (state) => state.modals.ratingModal
  );
  const album = useAppSelector((state) => findAlbumById(state, albumId));
  const modalRef = React.useRef<any>(null);
  const { pickNewAlbum } = useSessionData();

  React.useEffect(() => {
    if (isOpen) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [isOpen]);

  const confirm = (rating: number | null) => {
    if (!albumId) return;
    if (rating !== null) {
      dispatch(setAlbumRating({ albumId, rating }));
    }
    dispatch(setAlbumToSeen(albumId));
    dispatch(closeRatingModal());
    if (shouldPickNewAlbum) {
      pickNewAlbum();
    }
  };

  return (
    <BottomModal ref={modalRef} height="38%" onDismiss={() => dispatch(closeRatingModal())}>
      <View style={styles.container}>
        <ThemedText style={styles.prompt}>Wie hat dir das Album gefallen?</ThemedText>
        {album && (
          <ThemedText style={styles.albumName} numberOfLines={1}>
            {album.name}
          </ThemedText>
        )}
        <View style={styles.stars}>
          <StarRating rating={0} onRate={(r) => confirm(r)} size={40} />
        </View>
        <Pressable style={styles.skipButton} onPress={() => confirm(null)}>
          <ThemedText style={styles.skipText}>Kein Rating</ThemedText>
        </Pressable>
      </View>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: "center",
    gap: 12,
  },
  prompt: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  albumName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  stars: {
    marginTop: 8,
    marginBottom: 4,
  },
  skipButton: {
    marginTop: 4,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  skipText: {
    fontSize: 15,
    color: "gray",
  },
});

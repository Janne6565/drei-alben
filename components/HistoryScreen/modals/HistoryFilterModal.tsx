import { setAlbumNameFilter } from "@/features/historySettings/historySettings.slice";
import { closeHistoryFilterModal } from "@/features/modals/modals.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../../themed-text";
import BottomModal from "../../ui/bottom-modal";
import { AlbumNameFilter } from "./filters/AlbumNameFilter";
import CharacterFilter from "./filters/CharacterFilter";
import { EndDateFilter } from "./filters/EndDateFilter";
import ShowAllAlbumsFilter from "./filters/ShowAllAlbumsFilter";
import { StartDateFilter } from "./filters/StartDateFilter";

const HistoryFilterModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modals.historyFilter);
  const { albumNameFilter } = useAppSelector((state) => state.historySettings);
  const [searchString, setSearchString] = useState(albumNameFilter);
  const insets = useSafeAreaInsets();
  const filterModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isOpen) {
      filterModalRef.current?.present();
    } else {
      filterModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const submitAlbumNameFilter = useCallback(() => {
    dispatch(setAlbumNameFilter(searchString));
  }, [dispatch, searchString]);

  const onDismiss = () => {
    Keyboard.dismiss();
    submitAlbumNameFilter();
    dispatch(closeHistoryFilterModal());
  };

  return (
    <BottomModal
      ref={filterModalRef}
      height={"50%"}
      snapPoints={["80%"]}
      onDismiss={onDismiss}
      asChild
    >
      <BottomSheetView style={[{ paddingBottom: insets.bottom }]}>
        <Pressable onPress={Keyboard.dismiss} style={[styles.optionsContainer]}>
          <ThemedText style={styles.modalTitle}>Filter</ThemedText>
          <View style={styles.filterOptionsContainer}>
            <AlbumNameFilter
              snapTo={(index) => filterModalRef.current?.snapToIndex(index)}
              searchString={searchString}
              onChangeText={setSearchString}
              onEndEditing={() => {
                submitAlbumNameFilter();
                filterModalRef.current?.snapToIndex(0);
              }}
            />
            <CharacterFilter />
            <ShowAllAlbumsFilter />
            <StartDateFilter />
            <EndDateFilter />
          </View>
        </Pressable>
      </BottomSheetView>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    padding: 22,
    gap: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  filterOptionsContainer: {
    flexDirection: "column",
    gap: 14,
    justifyContent: "space-between",
  },
});

export default HistoryFilterModal;

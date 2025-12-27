import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { ReactNode, Ref, useCallback, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomModal = (
  props: {
    ref: Ref<BottomSheetModal>;
    children: ReactNode;
    height: string;
    asChild?: boolean;
  } & BottomSheetModalProps
) => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => [props.height], [props.height]);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: "#121212", overflow: "visible" }}
      handleIndicatorStyle={{
        backgroundColor: "#444",
        width: 40,
        opacity: 0.5,
      }}
      handleStyle={{ overflow: "visible" }}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableDismissOnClose
      {...props}
    >
      {props.asChild ? (
        props.children
      ) : (
        <BottomSheetView style={{ paddingBottom: insets.bottom }}>
          {props.children}
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
};

export default BottomModal;

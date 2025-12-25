import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import React, { ReactNode, Ref, useCallback, useMemo } from "react";

const BottomModal = (
  props: {
    ref: Ref<BottomSheetModal>;
    children: ReactNode;
    height: string;
  } & BottomSheetModalProps
) => {
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
      style={{
        background: "red",
      }}
      enableDismissOnClose
      {...props}
    >
      {props.children}
    </BottomSheetModal>
  );
};

export default BottomModal;

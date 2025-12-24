import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { ReactNode, Ref } from "react";

const BottomModal = (props: {
  ref: Ref<BottomSheetModal>;
  children: ReactNode;
}) => {
  return (
    <BottomSheetModal
      ref={props.ref}
      backgroundStyle={{ backgroundColor: "#121212" }}
      handleIndicatorStyle={{ backgroundColor: "#444", width: 40 }}
    >
      {props.children}
    </BottomSheetModal>
  );
};

export default BottomModal;

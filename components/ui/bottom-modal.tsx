import BottomSheet from "@gorhom/bottom-sheet";
import React, { ReactNode, Ref, useMemo } from "react";

const BottomModal = (props: { ref: Ref<BottomSheet>; children: ReactNode }) => {
  const snapPoints = useMemo(() => ["25%", "60%"], []);

  return (
    <BottomSheet
      index={-1} // closed
      ref={props.ref}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      {props.children}
    </BottomSheet>
  );
};

export default BottomModal;

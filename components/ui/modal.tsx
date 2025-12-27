import { ReactNode } from "react";
import {
  Modal as NativeModal,
  Pressable,
  StyleSheet,
  ViewProps,
} from "react-native";

const Modal = (props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: ReactNode;
  animationType?: NativeModal["props"]["animationType"];
  style?: ViewProps["style"];
}) => {
  return (
    <NativeModal
      visible={props.open}
      transparent
      animationType={props.animationType ? props.animationType : "fade"}
      onRequestClose={() => props.setOpen(false)}
    >
      <Pressable
        style={styles.centeredView}
        onPress={() => props.setOpen(false)}
      >
        <Pressable style={[styles.modalView, props.style]}>
          {props.children}
        </Pressable>
      </Pressable>
    </NativeModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#202020ff",
    borderRadius: 20,
    padding: 35,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Modal;

import { ReactNode } from "react";
import { View } from "react-native";
import IconButton from "../IconButton";
import { ThemedText } from "../themed-text";

const AlbumButton = (props: {
  children: ReactNode;
  onPress: () => void;
  label: string;
}) => {
  return (
    <View style={{ gap: 5, alignSelf: "center" }}>
      <IconButton onPress={props.onPress}>{props.children}</IconButton>
      <ThemedText style={{ alignSelf: "center" }}>{props.label}</ThemedText>
    </View>
  );
};

export default AlbumButton;

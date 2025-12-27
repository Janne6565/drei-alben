import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import IconButton from "../IconButton";
import { ThemedText } from "../themed-text";

export type AlbumButtonSize = "M" | "XL";

const AlbumButton = (props: {
  children: ReactNode;
  onPress: () => void;
  label: string;
  size?: AlbumButtonSize;
}) => {
  return (
    <TouchableOpacity
      style={{ gap: 5, alignSelf: "center" }}
      onPress={() => {
        if (process.env.EXPO_OS === "ios") {
          impactAsync(ImpactFeedbackStyle.Heavy);
        }
        props.onPress();
      }}
    >
      <IconButton style={[props.size === "M" && { padding: 5 }]}>
        {props.children}
      </IconButton>
      <ThemedText style={{ alignSelf: "center" }}>{props.label}</ThemedText>
    </TouchableOpacity>
  );
};

export default AlbumButton;

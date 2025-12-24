import * as Haptics from "expo-haptics";
import { ReactNode } from "react";
import { Pressable, ViewStyle } from "react-native";

const IconButton = (props: {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  label?: string;
}) => {
  return (
    <Pressable
      onPress={() => {
        if (process.env.EXPO_OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
        props.onPress();
      }}
      style={[
        {
          padding: 20,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 50,
          alignSelf: "center",
          borderColor: "rgba(82, 180, 230, 1)",
          borderWidth: 2,
          aspectRatio: 1,
        },
        props.style,
      ]}
    >
      {props.children}
    </Pressable>
  );
};

export default IconButton;

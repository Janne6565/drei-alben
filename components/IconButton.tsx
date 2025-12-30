import usePrimaryColor from "@/hooks/use-primary-color";
import { ReactNode } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

const IconButton = (props: {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
}) => {
  const primaryColor = usePrimaryColor();

  return (
    <Pressable
      onPress={() => {
        props.onPress && props.onPress();
      }}
      style={[
        {
          padding: 20,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 50,
          alignSelf: "center",
          borderColor: primaryColor,
          borderWidth: 2,
          aspectRatio: 1,
        },
        props.style,
      ]}
      disabled={!props.onPress}
    >
      {props.children}
    </Pressable>
  );
};

export default IconButton;

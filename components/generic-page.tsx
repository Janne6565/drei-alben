import { useThemeColor } from "@/hooks/use-theme-color";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "./themed-view";

const PADDING_TOP = 50;

const GenericPage = (props: { children: ReactNode }) => {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      {props.children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: PADDING_TOP, gap: 5 },
});

export default GenericPage;

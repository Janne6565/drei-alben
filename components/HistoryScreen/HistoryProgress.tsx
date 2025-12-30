import { ThemedText } from "@/components/themed-text";
import usePrimaryColor from "@/hooks/use-primary-color";
import { View } from "react-native";
import * as Progress from "react-native-progress";

export const HistoryProgress = ({
  totalAlbums,
  seenAlbumsCount,
}: {
  totalAlbums: number;
  seenAlbumsCount: number;
}) => {
  const primaryColor = usePrimaryColor();

  return (
    <View style={{ paddingBottom: 5, gap: 3 }}>
      <ThemedText style={{ alignSelf: "center" }}>
        Gehörte Alben: {seenAlbumsCount} / {totalAlbums}
      </ThemedText>
      <Progress.Bar
        width={300}
        color={primaryColor}
        style={{ alignSelf: "center" }}
        progress={totalAlbums > 0 ? seenAlbumsCount / totalAlbums : 0}
      />
    </View>
  );
};

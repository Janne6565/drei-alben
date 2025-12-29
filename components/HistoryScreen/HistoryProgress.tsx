import { ThemedText } from "@/components/themed-text";
import { useAppSelector } from "@/store/hooks";
import { View } from "react-native";
import * as Progress from "react-native-progress";

export const HistoryProgress = ({
  totalAlbums,
  seenAlbumsCount,
}: {
  totalAlbums: number;
  seenAlbumsCount: number;
}) => {
  return (
    <View style={{ paddingBottom: 5, gap: 3 }}>
      <ThemedText style={{ alignSelf: "center" }}>
        Gehörte Alben: {seenAlbumsCount} / {totalAlbums}
      </ThemedText>
      <Progress.Bar
        width={300}
        color={"rgba(82, 180, 230, 1)"}
        style={{ alignSelf: "center" }}
        progress={totalAlbums > 0 ? seenAlbumsCount / totalAlbums : 0}
      />
    </View>
  );
};

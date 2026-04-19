import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: number;
  color?: string;
}

const MAX_STARS = 5;

export const StarRating = ({
  rating,
  onRate,
  size = 20,
  color = "#f5a623",
}: StarRatingProps) => {
  return (
    <View style={styles.row}>
      {Array.from({ length: MAX_STARS }, (_, i) => {
        const starIndex = i + 1;
        const filled = starIndex <= rating;
        const icon = filled ? "star" : "star-outline";

        if (onRate) {
          return (
            <Pressable
              key={starIndex}
              onPress={() =>
                onRate(rating === starIndex ? 0 : starIndex)
              }
              hitSlop={4}
            >
              <Ionicons name={icon} size={size} color={color} />
            </Pressable>
          );
        }

        return (
          <Ionicons key={starIndex} name={icon} size={size} color={color} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 2,
  },
});

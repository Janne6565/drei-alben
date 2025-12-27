import { ThemedText } from "@/components/themed-text";
import { AlbumDto } from "@/types/albums";
import { openLink } from "@/util/music-provider-utils";
import { Fontisto } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Platform as DevicePlatform, Pressable, View } from "react-native";

const appendIfExistsOtherwiseSearch =
  (album: AlbumDto, albumDirectLink: string, searchUrLPrefix: string) =>
  (key: keyof AlbumDto) =>
    album[key]
      ? albumDirectLink + album[key]
      : searchUrLPrefix + encodeURIComponent(album.name);

interface Platform {
  label: string;
  icon: React.ReactNode;
  albumKey: keyof AlbumDto;
  calculateLink: (album: AlbumDto) => (key: keyof AlbumDto) => string;
}

export const MUSIC_PLATFORMS: readonly Platform[] = [
  ...(DevicePlatform.OS === "ios"
    ? [
        {
          label: "Apple Music",
          albumKey: "apple_music_id",
          calculateLink: (album: AlbumDto) =>
            appendIfExistsOtherwiseSearch(
              album,
              "https://music.apple.com/de/album/",
              "https://music.apple.com/de/search?term="
            ),
          icon: <Fontisto name="applemusic" size={24} color="white" />,
        } satisfies Platform,
      ]
    : []),

  {
    label: "Spotify",
    albumKey: "spotify_id",
    calculateLink: (album: AlbumDto) =>
      appendIfExistsOtherwiseSearch(
        album,
        "https://open.spotify.com/intl-de/album/",
        "https://open.spotify.com/search/"
      ),
    icon: <Entypo name="spotify" size={24} color="white" />,
  },

  {
    label: "Deezer",
    albumKey: "deezer_id",
    calculateLink: (album: AlbumDto) =>
      appendIfExistsOtherwiseSearch(
        album,
        "https://www.deezer.com/de/album/",
        "https://www.deezer.com/search/"
      ),
    icon: <FontAwesome5 name="deezer" size={24} color="white" />,
  },
];

export const MusicProviderList = (props: { album: AlbumDto }) => {
  return (
    <BottomSheetFlatList
      data={MUSIC_PLATFORMS}
      keyExtractor={(item: Platform) => item.label}
      renderItem={({ item }: { item: Platform }) => (
        <PlatformRow platform={item} album={props.album} />
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: "#1e1e1e" }} />
      )}
    />
  );
};

const PlatformRow = ({
  platform,
  album,
}: {
  platform: Platform;
  album: AlbumDto;
}) => (
  <Pressable
    onPress={() => openLink(platform.calculateLink(album)(platform.albumKey))}
    style={({ pressed }) => ({
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
      opacity: pressed ? 0.6 : 1,
    })}
  >
    <View style={{ width: 28, alignItems: "center" }}>{platform.icon}</View>

    <View style={{ flexDirection: "row" }}>
      <ThemedText style={{ marginLeft: 12, fontSize: 16 }}>
        {platform.label}
      </ThemedText>
      {!album[platform.albumKey] && (
        <ThemedText style={{ opacity: 0.6 }}>
          {" "}
          (Nicht vollständig Unterstützt)
        </ThemedText>
      )}
    </View>
  </Pressable>
);

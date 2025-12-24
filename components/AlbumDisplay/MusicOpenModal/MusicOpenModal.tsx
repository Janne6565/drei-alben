import { ThemedText } from "@/components/themed-text";
import { AlbumDto } from "@/types/albums";
import { openLink } from "@/util/music-provider-utils";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { Pressable, View } from "react-native";

const appendIfExistsOtherwiseSearch = (
  album: AlbumDto,
  key: keyof AlbumDto,
  albumDirectLink: string,
  searchUrLPrefix: string
) =>
  album[key]
    ? albumDirectLink + album[key]
    : searchUrLPrefix + encodeURIComponent(album.name);

interface Platform {
  label: string;
  icon: React.ReactNode;
  calculateLink: (album: AlbumDto) => string;
}

const platforms: Platform[] = [
  {
    label: "Spotify",
    calculateLink: (album: AlbumDto) =>
      appendIfExistsOtherwiseSearch(
        album,
        "spotify_id",
        "https://open.spotify.com/intl-de/album/",
        "https://open.spotify.com/search/"
      ),
    icon: <Entypo name="spotify" size={24} color="white" />,
  },
  {
    label: "Apple Music",
    calculateLink: (album: AlbumDto) =>
      appendIfExistsOtherwiseSearch(
        album,
        "apple_music_id",
        "https://music.apple.com/de/album/",
        "https://music.apple.com/de/search?term="
      ),
    icon: <Fontisto name="applemusic" size={24} color="white" />,
  },
  {
    label: "Deezer",
    calculateLink: (album: AlbumDto) =>
      appendIfExistsOtherwiseSearch(
        album,
        "deezer_id",
        "https://www.deezer.com/de/album/",
        "https://www.deezer.com/search/"
      ),
    icon: <FontAwesome5 name="deezer" size={24} color="white" />,
  },
];

export const MusicProviderList = (props: { album: AlbumDto }) => {
  return (
    <BottomSheetFlatList
      data={platforms}
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
    onPress={() => openLink(platform.calculateLink(album))}
    style={({ pressed }) => ({
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
      opacity: pressed ? 0.6 : 1,
    })}
  >
    <View style={{ width: 28, alignItems: "center" }}>{platform.icon}</View>

    <ThemedText style={{ marginLeft: 12, fontSize: 16 }}>
      {platform.label}
    </ThemedText>
  </Pressable>
);

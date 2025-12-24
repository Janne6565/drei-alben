import { Linking } from "react-native";

export const openAppleMusicSearch = async (p0: string) => {
  const query = encodeURIComponent(p0);
  const url = `https://music.apple.com/search?term=${query}`;

  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.warn("Apple Music cannot be opened");
  }
};

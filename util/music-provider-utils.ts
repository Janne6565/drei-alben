import { Linking } from "react-native";

export const openLink = async (link: string) => {
  const supported = await Linking.canOpenURL(link);
  if (supported) {
    await Linking.openURL(link);
  } else {
    console.warn("Apple Music cannot be opened");
  }
};

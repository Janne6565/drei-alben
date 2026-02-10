import {Linking} from "react-native";

export const openLink = async (link: string) => {
  try {
    await Linking.openURL(link);
  } catch (e) {
    console.error(e);
  }
};

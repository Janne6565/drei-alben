import {Linking} from "react-native";

export const openLink = async (link: string) => {
  await Linking.openURL(link);
};

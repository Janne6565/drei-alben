import NetInfo from "@react-native-community/netinfo";

/**
 * Returns true if the device is connected to a network
 * AND the internet is reachable.
 */
export async function isNetworkConnected(): Promise<boolean> {
  const state = await NetInfo.fetch();

  return state.isConnected === true && state.isInternetReachable === true;
}

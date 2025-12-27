import { fetchAlbums } from "@/features/albums/albums.thunks";
import { persistor, store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const unstable_settings = {
  anchor: "(tabs)",
};

const StartupLogic = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  return null;
};

export default function RootLayout() {
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <StartupLogic />
              <ThemeProvider value={DarkTheme}>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

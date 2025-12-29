import albumsReducer from "@/features/albums/albums.slice";
import modalsReducer from "@/features/modals/modals.slice";
import historySettings from "@/features/historySettings/historySettings.slice";
import narratorReducer from "@/features/narrators/narrators.slice";
import sessionDataReducer from "@/features/sessionData/sessionData.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  albums: albumsReducer,
  narrators: narratorReducer,
  sessionData: sessionDataReducer,
  historySettings: historySettings,
  modals: modalsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["albums", "narrators", "sessionData", "historySettings"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

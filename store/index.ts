import { default as albumsReducer } from "@/features/albums/albums.slice";
import { default as sessionDataReducer } from "@/features/sessionData/sessionData.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

import historySettings from '@/features/historySettings/historySettings.slice';

const rootReducer = combineReducers({
  albums: albumsReducer,
  sessionData: sessionDataReducer,
  historySettings: historySettings,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["albums", "sessionData", "historySettings"],
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

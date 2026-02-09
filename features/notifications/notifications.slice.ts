import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationsState {
  enabled: boolean;
  token: string | null;
  permissionGranted: boolean;
}

const initialState: NotificationsState = {
  enabled: true,
  token: null,
  permissionGranted: false,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
    setNotificationToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setPermissionGranted: (state, action: PayloadAction<boolean>) => {
      state.permissionGranted = action.payload;
    },
  },
});

export const {
  setNotificationEnabled,
  setNotificationToken,
  setPermissionGranted,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

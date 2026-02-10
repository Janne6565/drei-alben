import { RootState } from "@/store";

export const selectNotificationsEnabled = (state: RootState) =>
  state.notifications.enabled;

export const selectNotificationToken = (state: RootState) =>
  state.notifications.token;

export const selectPermissionGranted = (state: RootState) =>
  state.notifications.permissionGranted;

export const selectHasBeenAsked = (state: RootState) =>
  state.notifications.hasBeenAsked;

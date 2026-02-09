import React from "react";
import { View, StyleSheet, Switch, Alert, Platform, Linking } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectNotificationsEnabled,
  selectNotificationToken,
  selectPermissionGranted,
} from "@/features/notifications/notifications.selectors";
import {
  setNotificationEnabled,
  setNotificationToken,
  setPermissionGranted,
} from "@/features/notifications/notifications.slice";
import { updateTokenEnabled } from "@/hooks/notifications/useNotifications";

export function NotificationSettings() {
  const dispatch = useAppDispatch();
  const enabled = useAppSelector(selectNotificationsEnabled);
  const token = useAppSelector(selectNotificationToken);
  const permissionGranted = useAppSelector(selectPermissionGranted);
  const { expoPushToken, permissionStatus, requestPermissions } =
    useNotifications();

  React.useEffect(() => {
    if (expoPushToken) {
      dispatch(setNotificationToken(expoPushToken));
    }
    if (permissionStatus) {
      dispatch(setPermissionGranted(permissionStatus.granted));
    }
  }, [expoPushToken, permissionStatus, dispatch]);

  const handleToggle = async (value: boolean) => {
    if (!permissionGranted) {
      const status = await requestPermissions();
      if (!status.granted) {
        Alert.alert(
          "Permission Required",
          "Please enable notifications in your device settings to receive updates about new albums.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }
      dispatch(setPermissionGranted(true));
    }

    dispatch(setNotificationEnabled(value));
    if (expoPushToken || token) {
      await updateTokenEnabled(expoPushToken || token!, value);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Notifications
      </ThemedText>
      
      <View style={styles.setting}>
        <View style={styles.settingInfo}>
          <ThemedText type="defaultSemiBold">New Album Alerts</ThemedText>
          <ThemedText style={styles.description}>
            Get notified when new albums are released
          </ThemedText>
        </View>
        <Switch
          value={enabled && permissionGranted}
          onValueChange={handleToggle}
          disabled={!permissionGranted && !permissionStatus?.canAskAgain}
        />
      </View>

      {!permissionGranted && (
        <ThemedText style={styles.warning}>
          Notification permission not granted. Enable in settings to receive
          alerts.
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  warning: {
    marginTop: 16,
    fontSize: 12,
    opacity: 0.7,
    fontStyle: "italic",
  },
});

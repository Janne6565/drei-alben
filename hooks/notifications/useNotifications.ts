import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { API_BASE_URL } from "@/features/albums/albums.utils";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface NotificationPermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: string;
}

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermissionStatus>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        registerTokenWithBackend(token);
      }
    });

    getPermissionStatus().then(setPermissionStatus);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const requestPermissions = async () => {
    const status = await registerForPushNotificationsAsync();
    const permStatus = await getPermissionStatus();
    setPermissionStatus(permStatus);
    if (status) {
      setExpoPushToken(status);
      registerTokenWithBackend(status);
    }
    return permStatus;
  };

  return {
    expoPushToken,
    permissionStatus,
    notification,
    requestPermissions,
  };
}

async function getPermissionStatus(): Promise<NotificationPermissionStatus> {
  const { status, canAskAgain } = await Notifications.getPermissionsAsync();
  return {
    granted: status === "granted",
    canAskAgain,
    status,
  };
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }

    try {
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      if (!projectId) {
        console.log("Project ID not found");
        return;
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log("Push token:", token);
    } catch (e) {
      console.log("Error getting push token:", e);
    }
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  return token;
}

async function registerTokenWithBackend(token: string, enabled: boolean = true) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/push-tokens/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        enabled,
      }),
    });

    if (!response.ok) {
      console.error("Failed to register token with backend");
      throw new Error("Failed to register token with backend");
    } else {
      console.log("Push token registered with backend");
    }
  } catch (error) {
    console.error("Error registering token:", error);
    throw error;
  }
}

export async function unregisterToken(token: string) {
  try {
    await fetch(`${API_BASE_URL}/v1/push-tokens/unregister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    console.log("Push token unregistered");
  } catch (error) {
    console.error("Error unregistering token:", error);
  }
}

export async function updateTokenEnabled(token: string, enabled: boolean) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/push-tokens/${encodeURIComponent(token)}/enabled`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enabled }),
    });
    
    if (!response.ok) {
      // If update fails, try to register the token instead
      console.warn("Token update failed, attempting to register token");
      await registerTokenWithBackend(token, enabled);
    } else {
      console.log("Push token enabled status updated");
    }
  } catch (error) {
    console.error("Error updating token enabled, attempting to register:", error);
    // Fallback: try to register the token
    try {
      await registerTokenWithBackend(token, enabled);
    } catch (registerError) {
      console.error("Failed to register token as fallback:", registerError);
    }
  }
}

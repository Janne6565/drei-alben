import React, {useEffect, useRef} from "react";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import {Button} from "@/components/Button";
import BottomModal from "@/components/ui/bottom-modal";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {selectHasBeenAsked} from "@/features/notifications/notifications.selectors";
import {
  setHasBeenAsked,
  setNotificationEnabled,
  setNotificationToken,
  setPermissionGranted,
} from "@/features/notifications/notifications.slice";
import {useNotifications} from "@/hooks/notifications/useNotifications";
import {MaterialIcons} from "@expo/vector-icons";
import {useColorScheme} from "@/hooks/use-color-scheme";

export function NotificationPermissionModal() {
  const dispatch = useAppDispatch();
  const hasBeenAsked = useAppSelector(selectHasBeenAsked);
  const {expoPushToken, permissionStatus, requestPermissions} =
    useNotifications();
  const modalRef = useRef<any>(null);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const userMadeChoiceRef = useRef(false); // Track if user explicitly clicked a button

  useEffect(() => {
    // Show modal if user hasn't been asked yet (regardless of permission status)
    if (!hasBeenAsked) {
      // Reset the choice tracking when modal is about to show
      userMadeChoiceRef.current = false;
      
      // Small delay to let app fully load
      const timer = setTimeout(() => {
        console.log("Attempting to show notification modal, hasBeenAsked:", hasBeenAsked);
        modalRef.current?.present();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      modalRef.current?.dismiss();
    }
  }, [hasBeenAsked]);

  useEffect(() => {
    if (expoPushToken) {
      dispatch(setNotificationToken(expoPushToken));
    }
    if (permissionStatus) {
      dispatch(setPermissionGranted(permissionStatus.granted));
    }
  }, [expoPushToken, permissionStatus, dispatch]);

  const handleAccept = async () => {
    userMadeChoiceRef.current = true; // Mark that user made a choice
    
    // Request permissions if not already granted
    const permStatus = await requestPermissions();
    
    dispatch(setHasBeenAsked(true));
    dispatch(setNotificationEnabled(true));
    dispatch(setPermissionGranted(permStatus.granted));
    
    // Wait a bit for expoPushToken to be set by requestPermissions
    setTimeout(async () => {
      const tokenToUse = expoPushToken;
      if (tokenToUse) {
        try {
          const { updateTokenEnabled } = await import("@/hooks/notifications/useNotifications");
          await updateTokenEnabled(tokenToUse, true);
          console.log("Notification preference (enabled=true) sent to backend");
        } catch (error) {
          console.error("Failed to send preference to backend:", error);
        }
      }
    }, 500);
    
    modalRef.current?.dismiss();
  };

  const handleDeclineClick = async () => {
    userMadeChoiceRef.current = true; // Mark that user made a choice
    
    console.log("User explicitly declined notifications");
    dispatch(setHasBeenAsked(true));
    dispatch(setNotificationEnabled(false));
    
    // Communicate preference to backend if we have a token
    const tokenToUse = expoPushToken;
    if (tokenToUse) {
      try {
        const { updateTokenEnabled } = await import("@/hooks/notifications/useNotifications");
        await updateTokenEnabled(tokenToUse, false);
        console.log("Notification preference (enabled=false) sent to backend");
      } catch (error) {
        console.error("Failed to send preference to backend:", error);
      }
    }
    
    modalRef.current?.dismiss();
  };

  const handleDismiss = () => {
    // Only run decline logic if user didn't already make a choice via buttons
    if (userMadeChoiceRef.current) {
      console.log("Modal dismissed but user already made a choice, skipping");
      return;
    }
    
    console.log("Modal dismissed without choice, treating as decline");
    // User dismissed modal without clicking a button (shouldn't happen with enablePanDownToClose=false, but just in case)
    handleDeclineClick();
  };

  return (
    <BottomModal
      ref={modalRef}
      height={"50%"}
      onDismiss={handleDismiss}
      enablePanDownToClose={false}
    >
      <BottomSheetView
        style={[styles.container, {paddingBottom: insets.bottom}]}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="notifications-active"
            size={64}
            color={colorScheme === "dark" ? "#E6F4FE" : "#0a7ea4"}
          />
        </View>

        <ThemedText style={styles.title}>
          Benachrichtigungen aktivieren?
        </ThemedText>

        <ThemedText style={styles.description}>
          Möchtest du benachrichtigt werden, wenn neue Alben von &#34;Die drei ???&#34;
          veröffentlicht werden?
        </ThemedText>

        <ThemedText style={styles.subDescription}>
          Du kannst diese Einstellung jederzeit in den Einstellungen ändern.
        </ThemedText>

        <View style={styles.buttonContainer}>
          <Button
            label="Ja, benachrichtigen"
            onPress={handleAccept}
            variant="primary"
            style={styles.acceptButton}
          />
          <Button
            label="Nein, danke"
            onPress={handleDeclineClick}
            variant="secondary"
            style={styles.declineButton}
          />
        </View>
      </BottomSheetView>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.9,
  },
  subDescription: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.6,
    fontStyle: "italic",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
    marginTop: 8,
  },
  acceptButton: {
    width: "100%",
  },
  declineButton: {
    width: "100%",
  },
});

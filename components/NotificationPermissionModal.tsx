import React, {useEffect, useRef} from "react";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import {PrimaryButton} from "@/components/PrimaryButton";
import BottomModal from "@/components/ui/bottom-modal";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {selectHasBeenAsked, selectPermissionGranted,} from "@/features/notifications/notifications.selectors";
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
  const permissionGranted = useAppSelector(selectPermissionGranted);
  const {expoPushToken, permissionStatus, requestPermissions} =
    useNotifications();
  const modalRef = useRef<any>(null);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    // Show modal if user hasn't been asked yet and doesn't have permission
    if (!hasBeenAsked && !permissionGranted) {
      // Small delay to let app fully load
      const timer = setTimeout(() => {
        setIsOpen(true);
        modalRef.current?.present();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasBeenAsked, permissionGranted]);

  useEffect(() => {
    if (expoPushToken) {
      dispatch(setNotificationToken(expoPushToken));
    }
    if (permissionStatus) {
      dispatch(setPermissionGranted(permissionStatus.granted));
    }
  }, [expoPushToken, permissionStatus, dispatch]);

  const handleAccept = async () => {
    const status = await requestPermissions();
    dispatch(setHasBeenAsked(true));
    dispatch(setNotificationEnabled(status.granted));
    dispatch(setPermissionGranted(status.granted));
    modalRef.current?.dismiss();
    setIsOpen(false);
  };

  const handleDecline = () => {
    dispatch(setHasBeenAsked(true));
    dispatch(setNotificationEnabled(false));
    modalRef.current?.dismiss();
    setIsOpen(false);
  };

  if (!isOpen || hasBeenAsked) {
    return null;
  }

  return (
    <BottomModal
      ref={modalRef}
      height={"50%"}
      onDismiss={handleDecline}
      enablePanDownToClose={false}
      asChild
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
          <PrimaryButton
            label="Ja, benachrichtigen"
            onPress={handleAccept}
            style={styles.acceptButton}
          />
          <PrimaryButton
            label="Nein, danke"
            onPress={handleDecline}
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
    opacity: 0.7,
  },
});

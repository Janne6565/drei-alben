import {setSortDirection, setSortMode, setZoeMode,} from "@/features/historySettings/historySettings.slice";
import {HistorySortMode} from "@/features/historySettings/historySettings.types";
import {closeHistoryOptionsModal} from "@/features/modals/modals.slice";
import {clearSeenAlbums} from "@/features/sessionData/sessionData.slice";
import {
  setHasBeenAsked,
  setNotificationEnabled,
  setNotificationToken,
  setPermissionGranted,
} from "@/features/notifications/notifications.slice";
import {
  selectHasBeenAsked,
  selectNotificationsEnabled,
  selectNotificationToken,
  selectPermissionGranted,
} from "@/features/notifications/notifications.selectors";
import {updateTokenEnabled, useNotifications} from "@/hooks/notifications/useNotifications";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {assertUserConfirmation} from "@/util/assert-user-confirmation";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import React, {useCallback} from "react";
import {Alert, Linking, StyleSheet, Switch, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {OptionRow} from "../../OptionRow";
import {Button} from "../../Button";
import {ThemedText} from "../../themed-text";
import BottomModal from "../../ui/bottom-modal";

const HistoryOptionsModal = () => {
  const dispatch = useAppDispatch();
  const {isOpen} = useAppSelector((state) => state.modals.historyOptions);
  const {sortDirection, sortMode, zoeMode} = useAppSelector(
    (state) => state.historySettings
  );
  const enabled = useAppSelector(selectNotificationsEnabled);
  const token = useAppSelector(selectNotificationToken);
  const permissionGranted = useAppSelector(selectPermissionGranted);
  const hasBeenAsked = useAppSelector(selectHasBeenAsked);
  const {expoPushToken, permissionStatus, requestPermissions} = useNotifications();
  const insets = useSafeAreaInsets();
  const optionsModalRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (expoPushToken) {
      dispatch(setNotificationToken(expoPushToken));
    }
    if (permissionStatus) {
      dispatch(setPermissionGranted(permissionStatus.granted));
    }
  }, [expoPushToken, permissionStatus, dispatch]);

  React.useEffect(() => {
    if (isOpen) {
      optionsModalRef.current?.present();
    } else {
      optionsModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const onDismiss = () => {
    dispatch(closeHistoryOptionsModal());
  };

  const handleClick = useCallback(
    (value: HistorySortMode) => {
      if (sortMode === value) {
        dispatch(setSortDirection(sortDirection === "asc" ? "desc" : "asc"));
      } else {
        dispatch(setSortMode(value));
      }
    },
    [dispatch, sortDirection, sortMode]
  );

  const openClearAllModal = () => {
    assertUserConfirmation({
      title: "Bestätigen",
      message:
        "Bist du dir sicher, dass du deine gesamte Historie zurücksetzen willst?",
      onConfirm: () => dispatch(clearSeenAlbums()),
      confirmationText: "Zurücksetzen",
    });
  };

  const handleNotificationToggle = async (value: boolean) => {
    if (!permissionGranted) {
      const status = await requestPermissions();
      if (!status.granted) {
        Alert.alert(
          "Berechtigung erforderlich",
          "Bitte aktiviere Benachrichtigungen in deinen Geräteeinstellungen, um Updates über neue Alben zu erhalten.",
          [
            {text: "Abbrechen", style: "cancel"},
            {text: "Einstellungen öffnen", onPress: () => Linking.openSettings()},
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

  const handleResetNotificationPrompt = () => {
    Alert.alert(
      "Benachrichtigungsdialog zurücksetzen?",
      "Der Dialog zur Aktivierung von Benachrichtigungen wird beim nächsten App-Start erneut angezeigt.",
      [
        {text: "Abbrechen", style: "cancel"},
        {
          text: "Zurücksetzen",
          style: "destructive",
          onPress: () => {
            dispatch(setHasBeenAsked(false));
          },
        },
      ]
    );
  };

  return (
    <BottomModal
      ref={optionsModalRef}
      height={"60%"}
      onDismiss={onDismiss}
      asChild
    >
      <BottomSheetView
        style={[styles.optionsContainer, {paddingBottom: insets.bottom}]}
      >
        <ThemedText style={styles.modalTitle}>Einstellungen</ThemedText>
        <View>
          <ThemedText>Sortieren nach</ThemedText>
          <OptionRow
            label="Gehört am"
            selected={sortMode === "listenedDate"}
            onPress={() => handleClick("listenedDate")}
            direction={sortDirection}
          />

          <OptionRow
            label="Veröffentlicht am"
            selected={sortMode === "releaseDate"}
            onPress={() => handleClick("releaseDate")}
            direction={sortDirection}
          />

          <OptionRow
            label="Such übereinstimmung"
            selected={sortMode === "searchAccuracy"}
            onPress={() => handleClick("searchAccuracy")}
            direction={sortDirection}
          />
        </View>

        <View style={styles.container}>
          <ThemedText style={styles.optionHeader}>Zoë Mode</ThemedText>
          <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
            <ThemedText style={{opacity: 0.7}}>Modus aktiv: </ThemedText>
            <Switch
              value={zoeMode}
              onValueChange={(newVal) => {
                dispatch(setZoeMode(newVal));
              }}
              style={{alignSelf: "center"}}
            />
          </View>
        </View>

        <View style={styles.container}>
          <ThemedText style={styles.optionHeader}>Benachrichtigungen</ThemedText>
          <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
            <ThemedText style={{opacity: 0.7}}>
              Neue Album-Benachrichtigungen:{" "}
            </ThemedText>
            <Switch
              value={enabled}
              onValueChange={handleNotificationToggle}
              disabled={!permissionGranted && !permissionStatus?.canAskAgain}
              style={{alignSelf: "center"}}
            />
          </View>
          {!permissionGranted && (
            <ThemedText style={styles.warningText}>
              Berechtigung nicht erteilt. Aktiviere in den Einstellungen, um Benachrichtigungen zu erhalten.
            </ThemedText>
          )}
          {hasBeenAsked && (
            <Button
              label="Benachrichtigungsdialog zurücksetzen"
              onPress={handleResetNotificationPrompt}
              variant="secondary"
              style={{marginTop: 12}}
            />
          )}
        </View>

        <Button
          label="Gehörte Alben zurücksetzen"
          onPress={() => {
            openClearAllModal();
            optionsModalRef.current?.dismiss();
          }}
          variant="destructive"
        />
      </BottomSheetView>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    padding: 22,
    gap: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  optionRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionHeader: {opacity: 1},
  option: {gap: 5},
  container: {
    gap: 5,
  },
  warningText: {
    fontSize: 12,
    opacity: 0.7,
    fontStyle: "italic",
    marginTop: 4,
  },
});

export default HistoryOptionsModal;

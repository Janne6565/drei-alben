import { Alert } from "react-native";

type ConfirmationOptions = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmationText: string;
  isNonDestructive?: boolean;
};

export const assertUserConfirmation = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmationText,
  isNonDestructive,
}: ConfirmationOptions) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Abbrechen",
        onPress: onCancel,
        style: "cancel",
      },
      {
        text: confirmationText ? confirmationText : "Entfernen",
        onPress: onConfirm,
        style: isNonDestructive ? "default" : "destructive",
      },
    ],
    { cancelable: false }
  );
};

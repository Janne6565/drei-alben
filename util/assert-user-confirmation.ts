import { Alert } from "react-native";

type ConfirmationOptions = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmationText: string;
};

export const assertUserConfirmation = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmationText,
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
        style: "destructive",
      },
    ],
    { cancelable: false }
  );
};

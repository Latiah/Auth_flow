import { Alert, AlertButton, AlertOptions, Platform } from "react-native";

type AlertProps = {
    title: string;
    message?: string;
    buttons?: AlertButton[];
    options?: AlertOptions;
  };

const WebAlert = ({ title, message, buttons, options }: AlertProps) => {
  const result = window.confirm(`${title}\n${message}`);

  if (result) {
    const confirmOption = buttons?.find(({ style }) => style !== "cancel");
    confirmOption?.onPress && confirmOption?.onPress();
  } else {
    const cancelOption = buttons?.find(({ style }) => style === "cancel");
    cancelOption?.onPress && cancelOption.onPress();
  }
};

export function DefaultAlert({ title, message, buttons, options }: AlertProps) {
  if (Platform.OS === "web") {
    return WebAlert({ title, message, buttons, options });
  }

  return Alert.alert(title, message, buttons, options);
}

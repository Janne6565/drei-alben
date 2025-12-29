import {
  TextInput as NativeTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

const TextInput = (props: TextInputProps) => {
  return <NativeTextInput {...props} style={[styles.input, props.style]} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 10,
    height: 40,
    width: 160,
    marginVertical: 15,
    borderWidth: 1,
    fontSize: 15,
    padding: 10,
    color: "white",
  },
});

export default TextInput;

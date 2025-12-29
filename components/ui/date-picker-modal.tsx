import React, { useState } from "react";
import { Platform, Pressable, Modal, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import PrimaryButton from "../PrimaryButton";

interface DatePickerModalProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder: string;
}

export function DatePickerModal({
  value,
  onChange,
  placeholder,
}: DatePickerModalProps) {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value);

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShow(false);
      setSelectedDate(date || value);
      onChange(date || null);
    } else {
      // iOS
      setSelectedDate(date || value);
    }
  };

  const confirmIosDate = () => {
    setShow(false);
    onChange(selectedDate);
  };

  const cancelIosDate = () => {
    setShow(false);
    setSelectedDate(value); // Reset to original value on cancel
  };

  const displayDate = value ? value.toISOString().split("T")[0] : placeholder;

  return (
    <View>
      <Pressable onPress={() => setShow(true)} style={styles.inputContainer}>
        <ThemedText>{displayDate}</ThemedText>
      </Pressable>

      {show && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={show}
          onRequestClose={() => setShow(false)}
        >
          <ThemedView style={styles.centeredView}>
            <ThemedView style={styles.modalView}>
              <DateTimePicker
                testID="dateTimePicker"
                value={selectedDate || new Date()}
                mode="date"
                display="spinner"
                onChange={onDateChange}
              />
              {Platform.OS === "ios" && (
                <View style={styles.iosButtonContainer}>
                  <PrimaryButton onPress={cancelIosDate} text="Cancel" />
                  <PrimaryButton onPress={confirmIosDate} text="Confirm" />
                </View>
              )}
            </ThemedView>
          </ThemedView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    minHeight: 40,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iosButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
});

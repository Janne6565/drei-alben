import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Switch, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

interface DatePickerModalProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  toggleable?: boolean;
  onToggle?: (isEnabled: boolean) => void;
  isEnabled?: boolean;
}

const DatePicker = ({
  value,
  onChange,
  toggleable,
  isEnabled: isEnabledProp,
  onToggle,
}: DatePickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ?? new Date()
  );
  const [isAndroidModalOpen, setAndroidModalOpen] = useState(false);
  const [isEnabledState, setEnabledState] = useState(!!isEnabledProp);
  const isEnabled = toggleable ? isEnabledState : true;

  const onDateChange = (_event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setSelectedDate(date || value);
      onChange(date || null);
    } else {
      onChange(date || value);
      setSelectedDate(date || value);
    }
  };

  const setToggle = (newEnabled: boolean) => {
    setEnabledState(newEnabled);
    if (newEnabled) {
      onChange(selectedDate);
    } else {
      onChange(null);
    }
  };

  const onAndroidChange = (e: {
    type: "dismissed" | "set" | any;
    nativeEvent: { timestamp: number };
  }) => {
    if (e.type === "dismissed") {
      setAndroidModalOpen(false);
    } else if (e.type === "set") {
      const date = new Date(e.nativeEvent.timestamp);
      setSelectedDate(date);
      onChange(date);
      setAndroidModalOpen(false);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {toggleable && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
            gap: 5,
          }}
        >
          <ThemedText style={{ opacity: 0.9 }}>Filter aktiv:</ThemedText>
          <Switch
            value={isEnabled}
            onValueChange={(newVal) => {
              setToggle(newVal);
            }}
            style={{ alignSelf: "center" }}
          />
        </View>
      )}
      {Platform.OS === "ios" ? (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="compact"
          disabled={!isEnabled}
          onChange={onDateChange}
          style={{ opacity: isEnabled ? 1 : 0.5 }}
          themeVariant="dark"
        />
      ) : (
        <View style={{ opacity: isEnabled ? 1 : 0.6 }}>
          <TouchableOpacity onPress={() => setAndroidModalOpen(true)}>
            <ThemedText
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              {selectedDate?.toLocaleDateString()}
            </ThemedText>
          </TouchableOpacity>
          {isAndroidModalOpen && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              disabled={isAndroidModalOpen}
              onChange={onAndroidChange}
              onBlur={() => setAndroidModalOpen(false)}
              themeVariant="dark"
            />
          )}
        </View>
      )}
    </View>
  );
};

export default DatePicker;

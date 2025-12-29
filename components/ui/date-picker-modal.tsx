import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Switch, View } from "react-native";
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
          <ThemedText style={{ opacity: 0.9 }}>Filter aktiv: </ThemedText>
          <Switch
            value={isEnabled}
            onValueChange={(newVal) => {
              setToggle(newVal);
            }}
            style={{ alignSelf: "center" }}
          />
        </View>
      )}
      <DateTimePicker
        testID="dateTimePicker"
        value={selectedDate || new Date()}
        mode="date"
        display="compact"
        disabled={!isEnabled}
        onChange={onDateChange}
        style={{ opacity: isEnabled ? 1 : 0.5 }}
      />
    </View>
  );
};

export default DatePicker;

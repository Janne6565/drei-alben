import { ThemedText } from "@/components/themed-text";
import DatePicker from "@/components/ui/date-picker-modal";
import { setEndDate } from "@/features/historySettings/historySettings.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { StyleSheet, View } from "react-native";

const EndDateFilter = () => {
  const dispatch = useAppDispatch();
  const { endDate } = useAppSelector((state) => state.historySettings);

  const handleDateChange = (date: Date | null) => {
    dispatch(setEndDate(date ? date.toISOString().split("T")[0] : null));
  };

  const dateValue = endDate ? new Date(endDate) : null;

  return (
    <View style={styles.option}>
      <ThemedText style={styles.optionHeader}>Veröffentlich nach:</ThemedText>

      <DatePicker
        toggleable
        value={dateValue}
        onChange={handleDateChange}
        onToggle={(enabled) => !enabled && handleDateChange(null)}
        isEnabled={!!endDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  option: { gap: 5 },
  optionHeader: { opacity: 0.7 },
});

export default EndDateFilter;

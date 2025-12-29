import { ThemedText } from "@/components/themed-text";
import DatePicker from "@/components/ui/date-picker-modal";
import { setStartDate } from "@/features/historySettings/historySettings.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { StyleSheet, View } from "react-native";

const StartDateFilter = () => {
  const dispatch = useAppDispatch();
  const { startDate } = useAppSelector((state) => state.historySettings);

  const handleDateChange = (date: Date | null) => {
    dispatch(setStartDate(date ? date.toISOString().split("T")[0] : null));
  };

  const dateValue = startDate ? new Date(startDate) : null;

  return (
    <View style={styles.option}>
      <ThemedText style={styles.optionHeader}>Veröffentlich vor:</ThemedText>

      <DatePicker
        toggleable
        value={dateValue}
        onChange={handleDateChange}
        onToggle={(enabled) => !enabled && handleDateChange(null)}
        isEnabled={!!startDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  option: { gap: 5 },
  optionHeader: { opacity: 0.7 },
});

export default StartDateFilter;

import { ThemedText } from "@/components/themed-text";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStartDate } from "@/features/historySettings/historySettings.slice";
import { DatePickerModal } from "@/components/ui/date-picker-modal";

export function StartDateFilter() {
  const dispatch = useAppDispatch();
  const { startDate } = useAppSelector((state) => state.historySettings);

  const handleDateChange = (date: Date | null) => {
    dispatch(setStartDate(date ? date.toISOString().split("T")[0] : null));
  };

  const dateValue = startDate ? new Date(startDate) : null;

  return (
    <View style={styles.option}>
      <ThemedText style={styles.optionHeader}>
        Start-Datum für Release
      </ThemedText>

      <DatePickerModal
        value={dateValue}
        onChange={handleDateChange}
        placeholder="YYYY-MM-DD"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  option: { gap: 5 },
  optionHeader: { opacity: 0.7 },
});

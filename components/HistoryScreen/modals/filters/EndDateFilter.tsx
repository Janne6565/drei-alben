import { ThemedText } from "@/components/themed-text";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setEndDate } from "@/features/historySettings/historySettings.slice";
import { DatePickerModal } from "@/components/ui/date-picker-modal";

export function EndDateFilter() {
  const dispatch = useAppDispatch();
  const { endDate } = useAppSelector((state) => state.historySettings);

  const handleDateChange = (date: Date | null) => {
    dispatch(setEndDate(date ? date.toISOString().split("T")[0] : null));
  };

  const dateValue = endDate ? new Date(endDate) : null;

  return (
    <View style={styles.option}>
      <ThemedText style={styles.optionHeader}>
        End-Datum für Release
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

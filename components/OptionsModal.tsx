
import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { BottomModal } from './ui/bottom-modal';
import Picker from './Picker';
import { ThemedText } from './themed-text';
import { PrimaryButton } from './PrimaryButton';
import { SortOrder } from '@/features/albums/albums.types';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';

type OptionsModalProps = {
  isVisible: boolean;
  onClose: () => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
  showAll: boolean;
  onShowAllChange: (value: boolean) => void;
  onResetHistory: () => void;
};

export function OptionsModal({
  isVisible,
  onClose,
  sortOrder,
  onSortOrderChange,
  showAll,
  onShowAllChange,
  onResetHistory,
}: OptionsModalProps) {
  const backgroundColor = useThemeColor({}, 'background');

  const handleReset = () => {
    onResetHistory();
    onClose();
  };

  return (
    <BottomModal isVisible={isVisible} onClose={onClose}>
      <View style={[styles.content, { backgroundColor }]}>
        <ThemedText style={styles.title}>Display Options</ThemedText>

        <View style={styles.option}>
          <ThemedText>Sort by</ThemedText>
          <Picker
            value={sortOrder}
            onValueChange={(value) => {
              if (value) {
                onSortOrderChange(value as SortOrder);
              }
            }}
            items={[
              { label: 'Date Added (Newest First)', value: 'newest' },
              { label: 'Date Added (Oldest First)', value: 'oldest' },
              { label: 'Release Year (Newest First)', value: 'release_newest' },
              { label: 'Release Year (Oldest First)', value: 'release_oldest' },
            ]}
          />
        </View>

        <View style={styles.option}>
          <ThemedText>Show all albums (including duplicates)</ThemedText>
          <Switch
            value={showAll}
            onValueChange={onShowAllChange}
            trackColor={{ false: Colors.light.gray, true: Colors.light.tint }}
            thumbColor={Colors.light.background}
          />
        </View>

        <PrimaryButton onPress={handleReset} title="Reset History" />
      </View>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 22,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

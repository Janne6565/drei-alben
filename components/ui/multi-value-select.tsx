import {
  convertArrayToValidityMap,
  convertValidityMapToArray,
} from "@/util/array-util";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Checkbox, Icon } from "react-native-paper";
import { ThemedText } from "../themed-text";
import Modal from "./modal";
import TextInput from "./text-input";

interface Option<T> {
  label: string;
  value: T;
}

type OnChangeType = (value: string[] | ((prev: string[]) => string[])) => void;

export function MultiValueSelect<T>(props: {
  options: Option<T>[];
  defaultValue?: string[];
  keyExtractor: (opt: T) => string;
  value?: Record<string, boolean>;
  onChange: OnChangeType;
  label: string;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [internalSelectedValues, internalSetSelectedValues] = useState<
    Record<string, boolean>
  >(Object.fromEntries(props.defaultValue?.map((opt) => [opt, true]) ?? []));
  const selectedValues = props.value ? props.value : internalSelectedValues;
  const updateInternalSelectedValues: OnChangeType = (val) => {
    if (typeof val == "function") {
      internalSetSelectedValues(
        convertArrayToValidityMap(
          val(convertValidityMapToArray(internalSelectedValues))
        )
      );
    } else {
      internalSetSelectedValues(
        Object.fromEntries(val.map((opt) => [opt, true]) ?? [])
      );
    }
  };
  const setSelectedValues = props.value
    ? props.onChange
    : updateInternalSelectedValues;
  const [search, setSearch] = useState("");
  const filteredOptions = useMemo(
    () =>
      props.options.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      ),
    [search, props.options]
  );

  const toggleOption = (value: string) =>
    setSelectedValues((prev) => {
      if (!prev) {
        return [value];
      }
      if (prev.includes(value)) {
        return [...prev].filter((val) => val !== value);
      }
      return [...prev, value];
    });

  return (
    <>
      <View>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 10,
            flexDirection: "row",
          }}
          onPress={() => setModalVisible(true)}
        >
          <EvilIcons
            name="search"
            size={24}
            color="white"
            style={{ alignSelf: "center" }}
          />
          <ThemedText style={{ alignSelf: "center", paddingLeft: 5 }}>
            {props.label}
          </ThemedText>
        </TouchableOpacity>
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {Object.entries(selectedValues)
            .filter((entry) => entry[1])
            .map((entry) => (
              <SelectedOptionDisplay
                key={entry[0]}
                value={entry[0]}
                onPress={() => toggleOption(entry[0])}
              />
            ))}
        </View>
      </View>
      <Modal
        open={modalVisible}
        setOpen={setModalVisible}
        style={{ width: 250, height: 400, padding: 0 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
            width: "80%",
          }}
        >
          <TextInput
            onChangeText={setSearch}
            value={search}
            placeholder="Suche..."
            autoCorrect={false}
          />
          <TouchableOpacity
            style={{ opacity: search === "" ? 0.6 : 1 }}
            onPress={() =>
              search === "" ? setModalVisible(false) : setSearch("")
            }
          >
            <Icon source={"close"} size={25} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredOptions}
          renderItem={(item) => (
            <SelectionRow
              value={item.item}
              selected={!!selectedValues[props.keyExtractor(item.item.value)]}
              onToggle={() => toggleOption(props.keyExtractor(item.item.value))}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => props.keyExtractor(item.value)}
          style={{ padding: 0 }}
        />
      </Modal>
    </>
  );
}

function SelectedOptionDisplay(props: { value: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
      onPress={props.onPress}
    >
      <Icon source={"close"} size={20} />
      <ThemedText>{props.value}</ThemedText>
    </TouchableOpacity>
  );
}

function SelectionRow<T>(props: {
  value: Option<T>;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <TouchableOpacity style={styles.selectionRow} onPress={props.onToggle}>
      <View style={{ borderColor: "white", borderRadius: 2 }}>
        <Checkbox status={props.selected ? "checked" : "indeterminate"} />
      </View>
      <ThemedText style={{}}>{props.value.label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectionRow: {
    width: 200,
    height: 40,
    alignSelf: "center",
    borderRadius: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
  },
});

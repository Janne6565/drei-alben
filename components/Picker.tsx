import { Picker as LibPicker } from "@react-native-picker/picker";
interface Option<T> {
  value: T;
  label: string;
}
function Picker<T>(props: {
  value: T;
  setValue: (value: T) => void;
  options: Option<T>[];
}) {
  const renderer = (opt: Option<T>) => (
    <LibPicker.Item label={opt.label} value={opt.value} />
  );
  return (
    <LibPicker selectedValue={props.value} onValueChange={props.setValue}>
      {props.options.map(renderer)}
    </LibPicker>
  );
}

export default Picker;

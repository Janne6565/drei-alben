import { useAppSelector } from "@/store/hooks";

const usePrimaryColor = () => {
  const zoeMode = useAppSelector((state) => state.historySettings.zoeMode);
  if (zoeMode) {
    return "#FF1493";
  }
  return "rgba(82, 180, 230, 1)";
};

export default usePrimaryColor;

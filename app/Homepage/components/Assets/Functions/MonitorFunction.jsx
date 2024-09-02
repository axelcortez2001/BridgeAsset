import {
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import { useSetAtom } from "jotai";
import {
  setMonitorDataFromSelectedAtom,
  setMonitorDataToDefaultAtom,
} from "../Store/MonitorStore";
const useHandleSelectAssetMonitor = (setActionStatus) => {
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setMonitorDataFromSelected = useSetAtom(setMonitorDataFromSelectedAtom);
  const setMonitorDataToDefault = useSetAtom(setMonitorDataToDefaultAtom);
  const setSelectedType = useSetAtom(selectedTypeAtom);
  const handleSelectItem = async (item) => {
    await setMonitorDataToDefault();
    setSelectedAssetData(item);
    await setMonitorDataFromSelected();
    setSelectedType("monitor");
    setActionStatus(false);
  };
  return handleSelectItem;
};
export default useHandleSelectAssetMonitor;

import { useSetAtom } from "jotai";
import {
  setPeripheralFromDataSelectedAtom,
  setPeripheralToDefault,
} from "../Store/PeripheralStore";
import {
  fetchEmployeeAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";

const useHandleSelectAssetPeripheral = (setActionStatus) => {
  const setPeripheralDefault = useSetAtom(setPeripheralToDefault);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setPeripheralDataFromSelected = useSetAtom(
    setPeripheralFromDataSelectedAtom
  );
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const handleSelectAsset = async (opt) => {
    await setPeripheralDefault();
    setSelectedAssetData(opt);
    await setPeripheralDataFromSelected();
    setActionStatus(false);
    await fetchEmployee("peripheral");
  };
  return handleSelectAsset;
};
export default useHandleSelectAssetPeripheral;

import { useSetAtom } from "jotai";
import {
  setPeripheralFromDataSelectedAtom,
  setPeripheralToDefault,
} from "../Store/PeripheralStore";
import {
  fetchEmployeeAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";

const useHandleSelectAssetPeripheral = () => {
  const setPeripheralDefault = useSetAtom(setPeripheralToDefault);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setPeripheralDataFromSelected = useSetAtom(
    setPeripheralFromDataSelectedAtom
  );
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const setSelectedType = useSetAtom(selectedTypeAtom);
  const handleSelectAsset = async (opt) => {
    await setPeripheralDefault();
    setSelectedAssetData(opt);
    await setPeripheralDataFromSelected();
    await fetchEmployee("peripheral");
    setSelectedType("peripheral");
  };
  return handleSelectAsset;
};
export default useHandleSelectAssetPeripheral;

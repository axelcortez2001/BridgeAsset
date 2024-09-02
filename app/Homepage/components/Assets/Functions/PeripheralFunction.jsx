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

const useHandleSelectAssetPeripheral = (setActionStatus) => {
  const setPeripheralDefault = useSetAtom(setPeripheralToDefault);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setPeripheralDataFromSelected = useSetAtom(
    setPeripheralFromDataSelectedAtom
  );
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const setSelectedType = useSetAtom(selectedTypeAtom);
  const handleSelectAsset = async (opt) => {
    console.log("Selected Asset at peripheral: ", opt);
    await setPeripheralDefault();
    setSelectedAssetData(opt);
    await setPeripheralDataFromSelected();
    setActionStatus(false);
    await fetchEmployee("peripheral");
    setSelectedType("peripheral");
  };
  return handleSelectAsset;
};
export default useHandleSelectAssetPeripheral;

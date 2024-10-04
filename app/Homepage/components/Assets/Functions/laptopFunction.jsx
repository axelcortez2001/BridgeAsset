// utils/handleSelectAsset.js
import {
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import {
  itemStatusOptionAtom,
  setDataFromSelectedAtom,
  setDataToDefaultAtom,
} from "../Store/LaptopStore";
import { useSetAtom } from "jotai";

const useHandleSelectAssetLaptop = () => {
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setDataFromSelected = useSetAtom(setDataFromSelectedAtom);
  const setSelectedType = useSetAtom(selectedTypeAtom);
  const setItemStatusOption = useSetAtom(itemStatusOptionAtom);

  const handleSelectAsset = async (opt) => {
    setEmployeesToDefault();
    await setDataToDefault();
    setSelectedAssetData(opt);
    await setDataFromSelected();
    setSelectedType(opt.category);
    setItemStatusOption("Update");
  };

  return handleSelectAsset;
};

export default useHandleSelectAssetLaptop;

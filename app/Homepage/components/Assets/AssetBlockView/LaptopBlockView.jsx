import {
  assetDataAtom,
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import {
  itemStatusOptionAtom,
  setDataFromSelectedAtom,
  setDataToDefaultAtom,
} from "../Store/LaptopStore";
import AssetLoading from "../../LoadingComponents/AssetLoading";

const AssetBlockView = ({ setActionStatus, actionStatus, assetLoading }) => {
  const assetData = useAtomValue(assetDataAtom);
  const setSelectedType = useSetAtom(selectedTypeAtom);
  const setItemStatusOption = useSetAtom(itemStatusOptionAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setDataFromSelected = useSetAtom(setDataFromSelectedAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const handleSelectAsset = async (opt) => {
    setEmployeesToDefault();
    await setDataToDefault();
    setSelectedAssetData(opt);
    await setDataFromSelected();
    setSelectedType(opt.category);
    setItemStatusOption("Update");
    setActionStatus(false);
  };
  return assetLoading ? (
    <AssetLoading />
  ) : (
    <div className='w-full h-full flex items-center justify-center mt-2'>
      <div className='flex gap-2  w-full'>
        {assetData &&
          assetData?.length > 0 &&
          assetData.map((asset, index) => (
            <div
              className='border rounded-md p-2 hover:cursor-pointer'
              key={index}
              onClick={() => handleSelectAsset(asset)}
            >
              {asset.item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AssetBlockView;

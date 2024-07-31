import {
  assetDataAtom,
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

const AssetBlockView = ({ setActionStatus, actionStatus }) => {
  const assetData = useAtomValue(assetDataAtom);
  const setSelectedType = useSetAtom(selectedTypeAtom);
  const setItemStatusOption = useSetAtom(itemStatusOptionAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setDataFromSelected = useSetAtom(setDataFromSelectedAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const handleSelectAsset = async (opt) => {
    await setDataToDefault();
    setSelectedAssetData(opt);
    await setDataFromSelected();
    console.log("handleSelectAsset: ", opt);
    setSelectedType(opt.category);
    setItemStatusOption("Update");
    setActionStatus(false);
  };
  return (
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

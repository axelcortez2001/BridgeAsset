import React from "react";
import AssetLoading from "../../LoadingComponents/AssetLoading";
import { useAtomValue, useSetAtom } from "jotai";
import {
  assetDataAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import {
  setMonitorDataFromSelectedAtom,
  setMonitorDataToDefaultAtom,
} from "../Store/MonitorStore";

const MonitorBlockView = ({ setActionStatus, actionStatus, assetLoading }) => {
  const assetData = useAtomValue(assetDataAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setMonitorDataFromSelected = useSetAtom(setMonitorDataFromSelectedAtom);
  const setMonitorDataToDefault = useSetAtom(setMonitorDataToDefaultAtom);
  const handleSelectItem = async (item) => {
    await setMonitorDataToDefault();
    setSelectedAssetData(item);
    await setMonitorDataFromSelected();
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
              onClick={() => handleSelectItem(asset)}
            >
              {asset.item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MonitorBlockView;

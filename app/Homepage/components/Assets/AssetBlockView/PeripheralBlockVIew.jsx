import {
  assetDataAtom,
  fetchEmployeeAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import AssetLoading from "../../LoadingComponents/AssetLoading";
import {
  setPeripheralFromDataSelectedAtom,
  setPeripheralToDefault,
} from "../Store/PeripheralStore";

const PeripheralBlockVIew = ({
  setActionStatus,
  actionStatus,
  assetLoading,
}) => {
  //get atom
  const assetData = useAtomValue(assetDataAtom);
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  //set atom
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setPeripheralDataFromSelected = useSetAtom(
    setPeripheralFromDataSelectedAtom
  );
  const setPeripheralDefault = useSetAtom(setPeripheralToDefault);

  //handlers
  const handleSelectItem = async (item) => {
    await setPeripheralDefault();
    setSelectedAssetData(item);
    await setPeripheralDataFromSelected();
    setActionStatus(false);
    await fetchEmployee("peripheral");
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

export default PeripheralBlockVIew;

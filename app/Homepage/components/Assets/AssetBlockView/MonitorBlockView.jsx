import React from "react";
import AssetLoading from "../../LoadingComponents/AssetLoading";
import { useAtomValue, useSetAtom } from "jotai";
import {
  assetDataAtom,
  deleteAssetDataAtom,
  fetchEmployeeAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import {
  actionMonitorHistoryAtom,
  setMonitorDataFromSelectedAtom,
  setMonitorDataToDefaultAtom,
} from "../Store/MonitorStore";
import { setDataToDefaultAtom } from "../Store/LaptopStore";
import Blocks from "../AssetOtherComponents/Blocks";
import { toast } from "sonner";

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

  //;delete handlers
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const deleteAssetData = useSetAtom(deleteAssetDataAtom);
  const setHistoryToDefault = useSetAtom(actionMonitorHistoryAtom);
  const fetchEmployee = useSetAtom(fetchEmployeeAtom);
  const handleDeleteAsset = async (opt) => {
    if (window.confirm("Are you sure you want to change current selected?")) {
      if (opt !== null) {
        const _id = opt._id;
        const res = await deleteAssetData(_id);
        if (res?.success === true) {
          await setDataToDefault();
          setSelectedAssetData(null);
          setMonitorDataToDefault();
          setHistoryToDefault([]);
          await fetchEmployee("monitor");
          toast.success("Asset deleted successfully.");
        } else {
          toast.error("Failed to delete asset.");
        }
      }
    }
  };
  console.log("Asset Data: ", assetData);
  return assetLoading ? (
    <AssetLoading />
  ) : (
    <div className='w-full h-full flex items-center justify-center mt-2'>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 w-full'>
        {assetData &&
          assetData?.length > 0 &&
          assetData.map((asset, index) => (
            <Blocks
              key={index}
              selectAsset={handleSelectItem}
              asset={asset}
              delAsset={handleDeleteAsset}
            />
          ))}
      </div>
    </div>
  );
};

export default MonitorBlockView;

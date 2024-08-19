import {
  assetDataAtom,
  deleteAssetDataAtom,
  fetchEmployeeAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import AssetLoading from "../../LoadingComponents/AssetLoading";
import {
  actionPeripheralHistoryAtom,
  setPeripheralFromDataSelectedAtom,
  setPeripheralToDefault,
} from "../Store/PeripheralStore";
import Blocks from "../AssetOtherComponents/Blocks";
import { toast } from "sonner";

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
  const setHistoryDefault = useSetAtom(actionPeripheralHistoryAtom);
  //handlers
  const handleSelectItem = async (item) => {
    await setPeripheralDefault();
    setSelectedAssetData(item);
    await setPeripheralDataFromSelected();
    setActionStatus(false);
    await fetchEmployee("peripheral");
  };

  //handleReset
  const handleResetAtoms = async () => {
    await setPeripheralDefault();
    setSelectedAssetData(null);
    setHistoryDefault([]);
  };

  //delete asset
  const deleteAssetData = useSetAtom(deleteAssetDataAtom);
  const handleDelete = async (opt) => {
    if (window.confirm("Are you sure you want to delete?")) {
      if (opt !== null) {
        const _id = opt._id;
        const res = await deleteAssetData(_id);
        if (res?.success === true) {
          await handleResetAtoms();
          await fetchEmployee("peripheral");
          toast.success("Asset deleted successfully.");
        } else {
          toast.error("Failed to delete asset.");
        }
      } else {
        toast.error("No asset selected to delete.");
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
              delAsset={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default PeripheralBlockVIew;

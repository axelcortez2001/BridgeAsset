import {
  assetDataAtom,
  deleteAssetDataAtom,
  fetchEmployeeAtom,
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
import Blocks from "../AssetOtherComponents/Blocks";
import { toast } from "sonner";
import useHandleSelectAssetLaptop from "../Functions/laptopFunction";

const AssetBlockView = ({ setActionStatus, actionStatus, assetLoading }) => {
  const assetData = useAtomValue(assetDataAtom);
  const setSelectedType = useSetAtom(selectedTypeAtom);
  const setItemStatusOption = useSetAtom(itemStatusOptionAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);
  const setDataFromSelected = useSetAtom(setDataFromSelectedAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const setEmployeesToDefault = useSetAtom(handleReturnEmployeesDefaultAtom);
  const handleSelect = useHandleSelectAssetLaptop(setActionStatus);
  const handleSelectAsset = async (opt) => {
    handleSelect(opt);
  };

  //delete asset handler
  const fetchEmployees = useSetAtom(fetchEmployeeAtom);
  const deleteAssetData = useSetAtom(deleteAssetDataAtom);
  const handleDelete = async (asset) => {
    if (window.confirm("Are you sure you want to change current selected?")) {
      if (asset !== null) {
        const _id = asset._id;
        const res = await deleteAssetData(_id);
        if (res?.success === true) {
          await setDataToDefault();
          setSelectedAssetData(null);
          await fetchEmployees("laptop");
          toast.success("Asset deleted successfully.");
        } else {
          toast.success("Failed to delete asset.");
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
              selectAsset={handleSelectAsset}
              asset={asset}
              delAsset={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default AssetBlockView;

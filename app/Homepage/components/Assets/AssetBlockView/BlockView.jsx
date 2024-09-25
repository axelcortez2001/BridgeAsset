import {
  assetDataAtom,
  deleteAssetDataAtom,
  fetchEmployeeAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import Blocks from "../AssetOtherComponents/Blocks";
import useHandleSelectAssetLaptop from "../Functions/laptopFunction";
import { setDataToDefaultAtom } from "../Store/LaptopStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import AssetSkeleton from "../AssetComponents/AssetSkeleton";
import NoItems from "@/app/SharedComponents/NoItems";

const BlockView = ({ isLoading, setActionStatus, type, optionTab, all }) => {
  const assetData = useAtomValue(assetDataAtom);

  const handleSelect = useHandleSelectAssetLaptop(setActionStatus);
  const fetchEmployees = useSetAtom(fetchEmployeeAtom);
  const deleteAssetData = useSetAtom(deleteAssetDataAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);

  const handleSelectAsset = async (opt) => {
    handleSelect(opt);
  };

  const filterAsset = (opt) => {
    const newFilteredAsset = assetData?.filter((asset) => {
      if (type === "laptop") {
        return asset?.item_stats === opt;
      } else if (type === "monitor" || type === "peripheral") {
        return asset?.status?.name === opt;
      }
    });
    return newFilteredAsset;
  };

  const handleDelete = async (asset) => {
    if (window.confirm("Are you sure you want to change current selected?")) {
      if (asset !== null) {
        const _id = asset._id;
        const res = await deleteAssetData(_id);
        if (res?.success === true) {
          try {
            await setDataToDefault();
            setSelectedAssetData(null);

            if (type === "monitor") {
              setMonitorDataToDefault();
              setHistoryToDefault([]);
              console.log("monitor");
            } else if (type === "peripheral") {
              await handleResetAtoms();
              console.log("peripheral");
            } else {
              console.log("execute none, laptop");
            }
          } catch (e) {
            console.error(e);
          } finally {
            await fetchEmployees(type);
            toast.success("Asset deleted successfully.");
          }
        } else {
          toast.success("Failed to delete asset.");
        }
      }
    }
  };

  const skeletonCount = [1, 2, 3, 4, 5, 6];
  const layoutSharedStyle =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2";

  return (
    <div className="h-full">
      {filterAsset(optionTab) && filterAsset(optionTab)?.length ? (
        <div>
          <p className={`font-medium px-2 tracking-wider ${all ? "block" : "hidden"}`}>
            {optionTab.toUpperCase()}
          </p>
          <div className={`${layoutSharedStyle} ${all && "py-2"}`}>
            {filterAsset(optionTab)?.map((asset, index) => (
              <Blocks
                key={index}
                selectAsset={handleSelectAsset}
                asset={asset}
                delAsset={handleDelete}
              />
            ))}
          </div>
          <Divider className={`my-2 ${all ? "block" : "hidden"}`} />
        </div>
      ) : (
        <div className={`h-full ${all ? "hidden" : "block"}`}>
          <NoItems item={optionTab} />
        </div>
      )}
    </div>
  );
};

export default BlockView;

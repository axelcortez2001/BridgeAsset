import {
  assetDataAtom,
  deleteAssetDataAtom,
  fetchEmployeeAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import Blocks from "../AssetOtherComponents/Blocks";
import useHandleSelectAssetLaptop from "../Functions/laptopFunction";
import { setDataToDefaultAtom } from "../Store/LaptopStore";
import { toast } from "sonner";

const BlockView = ({ setActionStatus, type, optionTab }) => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {filterAsset(optionTab) &&
        filterAsset(optionTab)?.length > 0 &&
        filterAsset(optionTab)?.map((asset, index) => (
          <>
            <Blocks
              key={index}
              selectAsset={handleSelectAsset}
              asset={asset}
              delAsset={handleDelete}
            />
          </>
        ))}
    </div>
  );
};

export default BlockView;

import {
  assetDataAtom,
  deleteAssetDataAtom,
  fetchEmployeeAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
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
import UpdateLaptopInputForms from "../Laptop/Components/UpdateLaptopInputForms";
import ConfirmationModal from "@/app/SharedComponents/ConfirmationModal";
import useHandleSelectAssetMonitor from "../Functions/MonitorFunction";
import useHandleSelectAssetPeripheral from "../Functions/PeripheralFunction";

const BlockView = ({ isLoading, type, optionTab, all }) => {
  const [isConfirmationModal, setConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const selectedType = useAtomValue(selectedTypeAtom);

  const handleConfirmationModal = (asset) => {
    setConfirmationModal((prev) => !prev);
    setItemToDelete(asset);
  };

  const assetData = useAtomValue(assetDataAtom);

  const handleSelectLaptop = useHandleSelectAssetLaptop();
  const handleSelectMonitor = useHandleSelectAssetMonitor();
  const handleSelectPeripheral = useHandleSelectAssetPeripheral();

  const fetchEmployees = useSetAtom(fetchEmployeeAtom);
  const deleteAssetData = useSetAtom(deleteAssetDataAtom);
  const setDataToDefault = useSetAtom(setDataToDefaultAtom);
  const setSelectedAssetData = useSetAtom(selectedAssetDataAtom);

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
    if (asset !== null) {
      setDeleteLoading(true);

      async function promise() {
        try {
          const _id = asset?._id;
          const status = await deleteAssetData(_id);

          if (status.success) {
            await setDataToDefault();
            setSelectedAssetData(null);
            return "Successfully Deleted Asset";
          } else {
            throw new Error("Encountered an Error While Deleting Asset");
          }
        } catch (e) {
          throw e;
        } finally {
          await fetchEmployees(type);
        }
      }

      toast.promise(promise, {
        loading: "Deleting Asset Data",
        success: (message) => {
          setDeleteLoading(false);
          handleConfirmationModal();
          return `${message}`;
        },
        error: (message) => {
          setDeleteLoading(false);
          handleConfirmationModal();
          return `${message}`;
        },
      });
    } else {
      toast.success("Failed to delete asset.");
    }
  };

  const skeletonCount = [1, 2, 3, 4, 5, 6];
  const layoutSharedStyle =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2";

  return (
    <>
      <div className="h-full">
        {filterAsset(optionTab) && filterAsset(optionTab)?.length ? (
          <div>
            <p
              className={`font-medium px-2 tracking-wider ${
                all ? "block" : "hidden"
              }`}
            >
              {optionTab.toUpperCase()}
            </p>
            <div className={`${layoutSharedStyle} ${all && "py-2"}`}>
              {filterAsset(optionTab)?.map((asset, index) => (
                <Blocks
                  key={index}
                  handleSelect={
                    selectedType === "laptop"
                      ? handleSelectLaptop
                      : selectedType === "monitor"
                      ? handleSelectMonitor
                      : selectedType === "peripheral" && handleSelectPeripheral
                  }
                  asset={asset}
                  delAsset={() => handleConfirmationModal(asset)}
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

      <ConfirmationModal
        isOpen={isConfirmationModal}
        onClose={handleConfirmationModal}
        message={
          <p>
            Are you sure you want to delete
            <span className="font-bold capitalize"> {itemToDelete?.item} </span>
            Asset?
          </p>
        }
        header={"Confirm Delete"}
        action={() => handleDelete(itemToDelete)}
      />
    </>
  );
};

export default BlockView;

import {
  assetDataAtom,
  deleteAssetDataAtom,
  fetchEmployeeAtom,
  selectedAssetDataAtom,
} from "@/app/Homepage/AssetStore";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
import AssetLoading from "../../LoadingComponents/AssetLoading";
import { motion, AnimatePresence } from "framer-motion";
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
  const [accordionArray, setAccordionArray] = useState([
    "Active",
    "Stock",
    "Issued",
    "Defective",
    "Archive",
    "Transfer",
  ]);
  const tableOptions = [
    "Active",
    "Stock",
    "Issued",
    "Defective",
    "Archive",
    "Transfer",
  ];
  const toggleAccordion = (opt) => {
    if (accordionArray.some((acc) => acc === opt)) {
      setAccordionArray(accordionArray.filter((acc) => acc !== opt));
    } else {
      setAccordionArray([...accordionArray, opt]);
    }
  };
  const filterLaptopAsset = (opt) => {
    const newFilteredLaptopAsset = assetData?.filter((asset) => {
      return asset?.status?.name === opt;
    });
    return newFilteredLaptopAsset;
  };
  return assetLoading ? (
    <AssetLoading />
  ) : (
    <>
      {tableOptions.map((option, index) => (
        <div className='flex flex-col w-full p-2 gap-3' key={index}>
          <div className='border rounded-md p-2 max-w-full '>
            <div
              className='flex items-center gap-5 hover:cursor-pointer'
              onClick={() => toggleAccordion(option)}
            >
              <motion.div
                className='font-semibold'
                initial={{ rotate: 0 }}
                animate={{
                  rotate:
                    accordionArray &&
                    accordionArray.some((acc) => acc === option)
                      ? 90
                      : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {">"}
              </motion.div>
              <p>
                {option} -{" "}
                <span>
                  {filterLaptopAsset(option)?.length} item
                  {filterLaptopAsset(option)?.length > 1 ? "s" : ""}
                </span>
              </p>
            </div>
            <AnimatePresence>
              {accordionArray &&
                accordionArray.some((acc) => acc === option) && (
                  <motion.div
                    className='mt-2 w-full overflow-x-auto p-2'
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='w-full h-full flex items-center justify-center mt-2'>
                      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 w-full'>
                        {filterLaptopAsset(option) &&
                          filterLaptopAsset(option)?.length > 0 &&
                          filterLaptopAsset(option)?.map((asset, index) => (
                            <Blocks
                              key={index}
                              selectAsset={handleSelectItem}
                              asset={asset}
                              delAsset={handleDelete}
                            />
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </>
  );
};

export default PeripheralBlockVIew;

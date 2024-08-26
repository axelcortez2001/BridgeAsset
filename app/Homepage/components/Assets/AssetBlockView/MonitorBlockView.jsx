import React, { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
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
                              delAsset={handleDeleteAsset}
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

export default MonitorBlockView;

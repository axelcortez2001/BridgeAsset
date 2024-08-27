import {
  assetDataAtom,
  deleteAssetDataAtom,
  fetchEmployeeAtom,
  handleReturnEmployeesDefaultAtom,
  selectedAssetDataAtom,
  selectedTypeAtom,
} from "@/app/Homepage/AssetStore";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";
import {
  itemStatusOptionAtom,
  setDataFromSelectedAtom,
  setDataToDefaultAtom,
} from "../Store/LaptopStore";
import AssetLoading from "../../LoadingComponents/AssetLoading";
import Blocks from "../AssetOtherComponents/Blocks";
import { toast } from "sonner";
import useHandleSelectAssetLaptop from "../Functions/laptopFunction";
import { motion, AnimatePresence } from "framer-motion";
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
  const [accordionArray, setAccordionArray] = useState([
    "Active",
    "SOH",
    "For Repair",
    "Irreparable",
    "OTHERS",
  ]);
  const tableOptions = [
    { name: "Active", color: "green-500" },
    { name: "SOH", color: "amber-500" },
    { name: "For Repair", color: "red-500" },
    { name: "Irreparable", color: "gray-800" },
    { name: "OTHERS", color: "orange-700" },
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
      return asset?.item_stats === opt;
    });
    return newFilteredLaptopAsset;
  };
  return assetLoading ? (
    <AssetLoading />
  ) : (
    <>
      {tableOptions.map((option, index) => (
        <div
          className={`text-${option.color} flex flex-col w-full p-2 gap-3 max-h-screen overflow-y-auto`}
          key={index}
        >
          <div
            className={`border border-${option.color} rounded-md p-2 max-w-full `}
          >
            <div
              className='flex items-center gap-5 hover:cursor-pointer'
              onClick={() => toggleAccordion(option.name)}
            >
              <motion.div
                className='font-semibold'
                initial={{ rotate: 0 }}
                animate={{
                  rotate:
                    accordionArray &&
                    accordionArray.some((acc) => acc === option.name)
                      ? 90
                      : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {">"}
              </motion.div>
              <p>
                {option.name} -{" "}
                <span>
                  {filterLaptopAsset(option.name)?.length} item
                  {filterLaptopAsset(option.name)?.length > 1 ? "s" : ""}
                </span>
              </p>
            </div>
            <AnimatePresence>
              {accordionArray &&
                accordionArray.some((acc) => acc === option.name) && (
                  <motion.div
                    className='mt-2 w-full overflow-x-auto p-2'
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className='w-full h-full flex items-center justify-center mt-2'>
                      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 w-full'>
                        {filterLaptopAsset(option.name) &&
                          filterLaptopAsset(option.name)?.length > 0 &&
                          filterLaptopAsset(option.name)?.map(
                            (asset, index) => (
                              <Blocks
                                key={index}
                                selectAsset={handleSelectAsset}
                                asset={asset}
                                delAsset={handleDelete}
                              />
                            )
                          )}
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

export default AssetBlockView;
